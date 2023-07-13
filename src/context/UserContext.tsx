import { createContext, useState, useEffect, useRef } from 'react';
import { UserDataProps, authStateAnalizer, getUser, getUserRegistered, reloadUser, removeUserRegistration } from '../service/user';

interface ContextProps {
  children: any,
  initialState?: UserDataProps
}

interface UserContextProps {
  user: any,
  isLoading: boolean,
  error: any,
  userRegistered: UserDataProps,
  reload: () => void,
  logout: () => void,
  unregister?: any,
  reloadRegistration: () => void,
  removeUser: () => void | Promise<boolean>,
}

interface UserLoggedProps {
  user: any,
  isLoading: boolean,
  error: any
}

const userDefaultValue: UserDataProps = {
  id: '',
  username: '',
  email: '',
  completedChallenges: 0,
  enrolledChallenges: [],
  photo: '',
  currentChallenge: '',
  motivationalSentence: 'No Risk, No story'
}

const contextDefaultValues: UserContextProps = {
  user: null,
  isLoading: false,
  error: null,
  userRegistered: userDefaultValue,
  reload: () => {},
  logout: () => {},
  reloadRegistration: () => {},
  removeUser: () => {}
}

const UserContext = createContext<UserContextProps>(contextDefaultValues);

export const UserContextProvider = ({
  children,
  initialState = userDefaultValue
}: ContextProps) => {
  const [userState, setUserState] = useState<UserLoggedProps | null>(null);
  const [userRegistered, setUserRegistered] = useState<UserDataProps | null>(initialState);
  const unregister = useRef(() => {});

  useEffect(() => {
    const unsubscribe = authStateAnalizer((user: any) => {
      setUserState({ user, isLoading: false, error: null })

      if (user) {
        unregister.current = getUserRegistered(user.email, (value: UserDataProps) => setUserRegistered(value));
      } else {
        unregister.current();
      }
    })

    return () => {
      unsubscribe();
      setUserState({ user: null, isLoading: false, error: null });
      setUserRegistered(null);
      unregister.current();
    }
  }, [])

  const reloadRegistration = async () => {
    unregister.current = getUserRegistered(userState?.user.email, (value: UserDataProps) => setUserRegistered(value))
  }

  const handleReload = async () => {
    try {
      await reloadUser();
      const user = getUser();

      reloadRegistration();
      setUserState({ user, isLoading: false, error: null })
    } catch (error) {
      console.log(error)
      setUserState({ user: null, isLoading: false, error })
    }
  }

  const handleLogout = async () => {
    setUserState({ user: null, isLoading: false, error: null })
    setUserRegistered(null);
  }

  const removeUser = async (): Promise<boolean> => {
    if (typeof unregister.current == "function") unregister.current();

    try {
      await removeUserRegistration(userRegistered?.email || "");
      return true;
    } catch {
      return false;
    }
  }

  const value = {
    ...userState,
    userRegistered,
    reload: handleReload,
    logout: handleLogout,
    unregister: unregister.current,
    reloadRegistration,
    removeUser
  } as UserContextProps
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;
