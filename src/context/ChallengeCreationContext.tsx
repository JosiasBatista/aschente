import { Dispatch, createContext, useState } from "react";

interface ChallengeCreationProps {
  title: string,
  description: string
  difficulty: "pawn" | "rook" | "king" | null,
  isPublic: boolean,
  days: number,
  activities: string[]
}

interface ProviderProps {
  children: any,
  initialState?: ChallengeCreationProps
}

const ChallengeCreationContext = createContext<{
  challenge: ChallengeCreationProps | null;
  setChallenge: Dispatch<React.SetStateAction<ChallengeCreationProps | null>>;
}>({
  challenge: null,
  setChallenge: () => {}
})

export const ChallengeCreationContextProvider = ({
  children,
  initialState
}: ProviderProps) => {
  const [challenge, setChallenge] = useState<ChallengeCreationProps | null>(null);

  const value = {
    challenge,
    setChallenge
  }

  return (
    <ChallengeCreationContext.Provider value={value} >
      {children}
    </ChallengeCreationContext.Provider>
  )
}

export default ChallengeCreationContext;