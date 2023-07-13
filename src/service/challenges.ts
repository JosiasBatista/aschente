import { firestoreDb, Firebase } from ".";
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { UserDataProps, finishUserEnrollment, setUserCurrentChallenge } from "./user";
import moment from "moment";
import Toast from "react-native-root-toast";

export interface Challenge {
  id: string,
  title: string,
  description: string,
  difficulty: "pawn" | "rook" | "king",
  days: number,
  activities: string[]
}

export interface EnrollmentActivities { 
  [key: string]: boolean 
}

export interface ChallengeEnrollment {
  id?: string, 
  challengeId: string,
  userEmail: string,
  currentDay: number,
  percentage: number,
  enrollmentActivities: EnrollmentActivities[],
  totalDays: number,
  finished?: boolean;
  finishedAt?: Timestamp;
}

export interface ChallengeFinished {
  challengeId: string,
  finishDate: Timestamp,
  user: string
}

export interface CompletedChallenges extends Challenge {
  finish: ChallengeFinished
}

export async function getExistentChallenges(): Promise<Challenge[]> {
  return firestoreDb.collection("challenges")
    .get()
    .then((challengeDocuments) => {
      if (challengeDocuments.empty) return [];

      const challenges = challengeDocuments.docs.map((challenge) => {
        const challengeValue = challenge.data();
        challengeValue.id = challenge.id;

        return challengeValue
      })

      return challenges as Challenge[];
    }).catch(() => {
      throw new Error("error retrieving challenges");
    })
}

export async function getChallengeById(challengeId: string): Promise<Challenge | null> {
  return firestoreDb.collection("challenges")
    .where(Firebase.firestore.FieldPath.documentId(), "==", challengeId)
    .get()
    .then((challengeDocument) => {
      if (challengeDocument.empty) return null;

      const challenge = challengeDocument.docs[0].data();
      challenge.id = challengeDocument.docs[0].id;

      return challenge as Challenge;
    }).catch(() => {
      throw new Error("error retrieving challenge");
    })
}

export async function getChallengeEnrollment(
  userEmail: string, 
  challengeId: string, 
  setChallengeEnrollValue: (value: ChallengeEnrollment) => void
) {
  return firestoreDb.collection("challengeEnrollments")
    .where("challengeId", "==", challengeId)
    .where("userEmail", "==", userEmail)
    .onSnapshot((challengeDocs) => {
      if (challengeDocs.empty) return setChallengeEnrollValue;

      const challengeEnroll = challengeDocs.docs[0].data();
      challengeEnroll.id = challengeDocs.docs[0].id;

      setChallengeEnrollValue(challengeEnroll as ChallengeEnrollment)
    })
}

export async function enrollUserInChallenge(userEmail: string, challenge: Challenge, challengeActivities: string[]): Promise<ChallengeEnrollment | null> {
  const userIsInChallenge = await checkIfUserIsAlreadyEnrolledInChallenge(userEmail);

  if (userIsInChallenge) return null;
  
  const enrollmentData = {
    userEmail: userEmail,
    challengeId: challenge.id,
    currentDay: 1,
    percentage: 0,
    enrollmentActivities: passActivitiesToEnrollment(challengeActivities),
    totalDays: challenge.days
  } as ChallengeEnrollment

  return firestoreDb.collection("challengeEnrollments")
    .add(enrollmentData)
    .then(async () => {
      await setUserCurrentChallenge(userEmail, challenge.id);
      return enrollmentData;
    }).catch(() => {
      return null;
    })
}

export async function updateUserEnrollment(enrollmentId: string, updatedActivities: EnrollmentActivities[]) {
  if (!enrollmentId) return;

  const finished = updatedActivities.every((status) => {
    return Object.values(status)[0] == true
  })

  return firestoreDb.collection("challengeEnrollments")
    .doc(enrollmentId)
    .update({
      enrollmentActivities: updatedActivities,
      finishedAt: finished ? serverTimestamp() : null,
      finished
    })
}

export function passActivitiesToEnrollment(activities: string[]) {
  const enrollmentActivities: EnrollmentActivities[] = [];

  activities.forEach(activity => {
    const activityStatus: EnrollmentActivities = {}
    activityStatus[activity] = false;

    enrollmentActivities.push(activityStatus)
  })

  return enrollmentActivities;
}

async function checkIfUserIsAlreadyEnrolledInChallenge(userEmail: string): Promise<boolean> {
  let isUserEnrolled = false;

  return firestoreDb.collection("challengeEnrollments")
    .where("userEmail", "==", userEmail)
    .get()
    .then((enrollments) => {
      if (!enrollments.empty) isUserEnrolled = true;

      return isUserEnrolled
    }).catch(() => {
      throw new Error("error retrieving enrollment");
    })
}

async function increaseDayInChallengeEnrollment(challengeEnrollment: ChallengeEnrollment, challengeDays: number, user: UserDataProps) {
  if (challengeEnrollment.currentDay == challengeDays) {
    finishEnrollmentChallenge(challengeEnrollment, user)
  } else {
    firestoreDb.collection("challengeEnrollments")
      .doc(challengeEnrollment.id)
      .update({
        currentDay: challengeEnrollment.currentDay + 1,
        percentage: (challengeEnrollment.currentDay * 100) / challengeDays,
        enrollmentActivities: cleanActivities(challengeEnrollment.enrollmentActivities),
        finished: false
      })
  }
}

function deleteEnrollment(enrollId: string) {
  if (!enrollId) throw new Error("do not have enroll id");

  firestoreDb.collection("challengeEnrollments")
    .doc(enrollId)
    .delete();
}

function finishEnrollmentChallenge(challengeEnroll: ChallengeEnrollment, user: UserDataProps) {
  const finishData = {
    challengeId: challengeEnroll.challengeId,
    finishDate: serverTimestamp(),
    user: challengeEnroll.userEmail
  }

  firestoreDb.collection("challengesFinished")
    .add(finishData)
    .then(() => {
      deleteEnrollment(challengeEnroll.id || "");
      finishUserEnrollment(user);

      Toast.show("Parabéns! Você concluiu um desafio.", {
        position: Toast.positions.CENTER,
        duration: Toast.durations.LONG
      })
    })
}

function cleanActivities(enrollmentActivities: EnrollmentActivities[]) {
  const cleanedActivities: EnrollmentActivities[] = [] ;

  enrollmentActivities.forEach((activity) => {
    cleanedActivities.push({
      [Object.keys(activity)[0]]: false
    })
  })

  return cleanedActivities;
}

function isNextDay(next: Date, current: Date) {
  var date = new Date(next);
  date.setDate(date.getDate() + 1);
  
  return (date.getFullYear() === current.getFullYear()) && (date.getMonth() === current.getMonth()) && (date.getDate() === current.getDate());
};

export async function checkChallengeEnrollAndUpdate(challengeEnrollment: ChallengeEnrollment | null, challengeDays: number | null, user: UserDataProps) {
  if (!challengeDays || !challengeEnrollment) return;

  if (challengeEnrollment?.finished) {
    if (challengeEnrollment.finishedAt) {
      const todayDate = moment();
      const date = moment(challengeEnrollment.finishedAt.toDate());

      if (isNextDay(date.toDate(), todayDate.toDate())) {
        increaseDayInChallengeEnrollment(challengeEnrollment, challengeDays, user);
      } else if (todayDate.diff(date, 'days') > 1) {
        console.log("You lost a day in your challenge")
      }
    }
  }
}

export async function getUserChallengesCompleted(userEmail: string): Promise<CompletedChallenges[]> {
  return firestoreDb.collection("challengesFinished")
    .where("user", "==", userEmail)
    .get()
    .then((finishedDoc) => {
      if (finishedDoc.empty) return [];
      const challengesIds: string[] = [];
      const challenges: { [key: string]: any } = {};

      finishedDoc.docs.map((finishedInfo) => {
        const value = finishedInfo.data();
        value.id = finishedInfo.id;
        challengesIds.push(finishedInfo.data().challengeId);

        challenges[finishedInfo.data().challengeId] = value;
      });

      return firestoreDb.collection("challenges")
        .where(Firebase.firestore.FieldPath.documentId(), "in", challengesIds)
        .get()
        .then((challengesDocs) => {
          if (challengesDocs.empty) return [];

          const challengesFinishedInfos = challengesDocs.docs.map((chal) => {
            const value = chal.data();
            value.id = chal.id;
            value.finish = challenges[chal.id];

            return value;
          })

          return challengesFinishedInfos as CompletedChallenges[];
        })
    })
}