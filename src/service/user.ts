import {
  User,
  createUserWithEmailAndPassword,
  initializeAuth,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import firebaseApp, { firestoreDb } from './index';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export interface BasicAuthProps {
  email: string,
  password: string
}

interface SendEmailProps {
  email: string
}

export interface RegistrationProps {
  username: string,
  email: string,
  completedChallenges?: number,
  enrolledChallenges?: string[],
  photo?: string,
  password?: string
}

export interface UserDataProps {
  id: string,
  username: string,
  email: string,
  completedChallenges: number,
  enrolledChallenges: string[],
  currentChallenge: string,
  photo: string,
  motivationalSentence?: string
}

export function getUser() {
  return auth.currentUser;
}

export async function signUpUserWithEmailAndPassword({ email, password }: BasicAuthProps) {
  return createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
    if (user) {
      try {
        await sendEmailVerification(user);
      } catch (error) {

        console.log(error);
        return error;
      }
    }
  }).catch((error) => {
    console.log(error);
    return error;
  })
}

export function signInUserWithEmailAndPassword({ email, password }: BasicAuthProps) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function sendPasswordEmail({ email }: SendEmailProps) {
  return sendPasswordResetEmail(auth, email);
}

export function authStateAnalizer(args: any) {
  return onAuthStateChanged(auth, args);
}

export function reloadUser() {
  const user: User | null = auth.currentUser;

  if (user) {
    return reload(user);
  } else {
    throw Error("user not logged")
  }
}

export function makeUserSignOut() {
  return signOut(auth);
}

export async function registerUser(userRegistration: RegistrationProps): Promise<UserDataProps> {
  userRegistration.completedChallenges = 0;
  userRegistration.enrolledChallenges = [];
  userRegistration.photo = "";

  delete userRegistration.password;

  let userExists = await checkUserExistence(userRegistration.username);

  if (userExists) {
    throw new Error('userAlreadyExist')
  }

  return firestoreDb.collection("users")
    .doc(userRegistration.email)
    .set(userRegistration)
    .then(() => {
      const user = {
        ...userRegistration,
        id: userRegistration.email 
      } as UserDataProps

      return user;
    }).catch((error) => {
      console.log(error);

      throw new Error('errorCreatingUser')
    })
}

export function getUserRegistered(userEmail: string, setUserRegistered: (user: UserDataProps) => void) {
  return firestoreDb.collection("users")
    .doc(userEmail)
    .onSnapshot(async (snapshot) => {
      if (snapshot.exists) {
        const value = snapshot.data() || {};
        value.id = snapshot.id;

        setUserRegistered(value as UserDataProps);
      }
    })
}

async function checkUserExistence(username: string): Promise<boolean> {
  return firestoreDb.collection("users")
    .where("username", "==", username)
    .get()
    .then((userDoc) => {
      return !userDoc.empty
    }).catch(() => {
      return true;
    })
}

export async function setUserCurrentChallenge(userEmail: string, challengeId: string) {
  await firestoreDb.collection("users")
    .doc(userEmail)
    .update({ currentChallenge: challengeId })
}

export async function finishUserEnrollment(user: UserDataProps) {
  firestoreDb.collection("users")
    .doc(user.email)
    .update({
      currentChallenge: "",
      completedChallenges: user.completedChallenges + 1
    })
}