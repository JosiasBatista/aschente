import { useState } from 'react'
import { makeUserSignOut } from '../service/user'

interface UseSignOutProps {
  signedOut?: boolean,
  isLoading: boolean,
  error: unknown,
}

export const useSignOut = () => {
  const [signOutState, setSignOutState] = useState<UseSignOutProps>({
    signedOut: false,
    isLoading: false,
    error: null,
  })

  const handleSignOut = async () => {
    setSignOutState({ isLoading: true, error: null })

    try {
      await makeUserSignOut()
      setSignOutState({ signedOut: true, isLoading: false, error: null })
    } catch (error) {
      console.log(error)
      setSignOutState({ signedOut: false, isLoading: false, error })
    }
  }

  return [{ ...signOutState }, handleSignOut] as const
}
