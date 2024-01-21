import React, { createContext, useContext, useEffect, useState, Dispatch, useRef } from 'react';
import { ChallengeEnrollment, checkChallengeEnrollAndUpdate, getChallengeEnrollment } from '../service/challenges';
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
  percentage: 0,
  totalDays: 0
}

const ChallengeEnrollContext = createContext<{ 
  challengeEnrollment: ChallengeEnrollment | null;
  setChallengeEnrollment: Dispatch<React.SetStateAction<ChallengeEnrollment | null>>;
  refresh: any
}>({
  challengeEnrollment: null,
  setChallengeEnrollment: () => {},
  refresh: () => {}
});

export const ChallengeEnrollContextProvider = ({
  children,
  initialState = challengeDefaultValues
}: ContextProps) => {
  const { userRegistered } = useContext(UserContext);
  const [challengeEnrollment, setChallengeEnrollment] = useState<ChallengeEnrollment | null>(null);
  const unregister = useRef(() => {});

  useEffect(() => {
    listenChallengeEnroll();

    return () => {
      if (typeof unregister.current == "function")
        unregister.current()
    }
  }, [userRegistered])

  const listenChallengeEnroll = async () => {
    if (userRegistered && userRegistered && userRegistered.currentChallenge) {
      unregister.current = await getChallengeEnrollment(
        userRegistered.email, 
        userRegistered.currentChallenge,
        (value) => setChallengeEnrollment(value)
      );
    } else {
      if (typeof unregister.current == "function")
        unregister.current()
      setChallengeEnrollment(null);
    }
  }

  useEffect(() => {
    checkChallengeEnrollAndUpdate(challengeEnrollment, challengeEnrollment?.totalDays || null, userRegistered);
  }, [challengeEnrollment])

  const value = {
    challengeEnrollment,
    setChallengeEnrollment,
    refresh: listenChallengeEnroll
  }

  return (
    <ChallengeEnrollContext.Provider value={value} >
      {children}
    </ChallengeEnrollContext.Provider>
  )
}

export default ChallengeEnrollContext;