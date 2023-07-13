import { useState } from 'react';
import { signInUserWithEmailAndPassword } from '../service/user';

interface UseSignInProps {
  isLoading: boolean,
  error: unknown,
  user?: unknown
}

interface LoginProps {
  email: string,
  password: string
}

export const useSignIn = () => {
    const [signInState, setSignInState] = useState<UseSignInProps>({
        isLoading: false,
        error: null,
        user: null
    });

    const handleSignIn = async ({email, password}: LoginProps) => {
        setSignInState({ isLoading: true, error: null })    
        
        try {
          const { user } = await signInUserWithEmailAndPassword({
            email: email,
            password: password
          })

          setSignInState({ user: user, isLoading: false, error: null })
        } catch (error) {
            console.log(error)
            setSignInState({ isLoading: false, error })
        }
    }

    return [{ ...signInState }, handleSignIn] as const;
}