import { useState } from 'react';
import { BasicAuthProps, signUpUserWithEmailAndPassword } from '../service/user';

interface UseSignUpProps {
  isLoading: boolean,
  error: unknown
}

export const useSignUp = () => {
  const [signUpState, setSignUpState] = useState<UseSignUpProps>({
    isLoading: false,
    error: null
  })

  const handleSignUp = async (values: BasicAuthProps) => {
    setSignUpState({ isLoading: true, error: null });

    try {
      await signUpUserWithEmailAndPassword(values);

      return setSignUpState({ isLoading: false, error: null })
    } catch (error) {
      setSignUpState({ isLoading: false, error: error })
    }
  }

  return [{...signUpState}, handleSignUp] as const;
}