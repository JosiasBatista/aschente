import React, { createContext, useContext, useEffect, useState, Dispatch } from 'react';
import { ChallengeEnrollment, getChallengeEnrollment } from '../service/challenges';
import UserContext from './UserContext';

interface ContextProps {
  children: any,
  initialState?: ChallengeEnrollment
}

const challengeDefaultValues: ChallengeEnrollment = {
  userEmail: "",
  challengeId: "",
  currentDay: 1,
  enrollmentActivities: [],
  percentage: 0
}

const ChallengeEnrollContext = createContext<{ 
  challengeEnrollment: ChallengeEnrollment | null;
  setChallengeEnrollment: Dispatch<React.SetStateAction<ChallengeEnrollment | null>>;
}>({
  challengeEnrollment: null,
  setChallengeEnrollment: () => {}
});

export const ChallengeEnrollContextProvider = ({
  children,
  initialState = challengeDefaultValues
}: ContextProps) => {
  const { userRegistered } = useContext(UserContext);
  const [challengeEnrollment, setChallengeEnrollment] = useState<ChallengeEnrollment | null>(null);

  useEffect(() => {
    let challengeEnrollListener: () => void;

    const listenChallengeEnroll = async () => {
      challengeEnrollListener = await getChallengeEnrollment(
        userRegistered.email, 
        userRegistered.currentChallenge,
        (value) => setChallengeEnrollment(value)
      );
    }

    listenChallengeEnroll()
    return () => {
      challengeEnrollListener()
    }
  }, [userRegistered])

  const value = {
    challengeEnrollment,
    setChallengeEnrollment
  }

  return (
    <ChallengeEnrollContext.Provider value={value} >
      {children}
    </ChallengeEnrollContext.Provider>
  )
}

export default ChallengeEnrollContext;