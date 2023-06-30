import { firestoreDb, Firebase } from ".";
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { setUserCurrentChallenge } from "./user";

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
  finished?: boolean;
  finishedAt?: Timestamp;
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

export async function getChallengeEnrollment(userEmail: string, challengeId: string): Promise<ChallengeEnrollment | null> {
  return firestoreDb.collection("challengeEnrollments")
    .where("challengeId", "==", challengeId)
    .where("userEmail", "==", userEmail)
    .get()
    .then((challengeDocs) => {
      if (challengeDocs.empty) return null;

      const challengeEnroll = challengeDocs.docs[0].data();
      challengeEnroll.id = challengeDocs.docs[0].id;

      return challengeEnroll as ChallengeEnrollment;
    }).catch(() => {
      throw new Error("error retrieving challenge enroll");
    })
}

export async function enrollUserInChallenge(userEmail: string, challengeId: string, challengeActivities: string[]): Promise<ChallengeEnrollment | null> {
  const enrollmentData = {
    userEmail: userEmail,
    challengeId: challengeId,
    currentDay: 1,
    percentage: 0,
    enrollmentActivities: passActivitiesToEnrollment(challengeActivities)
  } as ChallengeEnrollment

  return firestoreDb.collection("challengeEnrollments")
    .add(enrollmentData)
    .then(async () => {
      await setUserCurrentChallenge(userEmail, challengeId);
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