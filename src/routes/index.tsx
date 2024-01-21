import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import UserContext, { UserContextProvider } from '../context/UserContext';
import { AppRoutes } from './app.routes';
import { InitialRoutes } from './initial.routes';
import { UnverifiedRoutes } from './unverified.routes';
import { Loading } from '../components/Loading';
import { ChallengeEnrollContextProvider } from '../context/ChallengeEnrollContext';
import { ChallengeCreationContextProvider } from '../context/ChallengeCreationContext';

export function Routes() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading || (isLoading == undefined && user == undefined)) 
    return <Loading />

  return (
    <NavigationContainer>
      <RootSiblingParent>
          {user ?
            user.emailVerified ?
              <ChallengeEnrollContextProvider>
                <ChallengeCreationContextProvider>
                  <AppRoutes />
                </ChallengeCreationContextProvider>
              </ChallengeEnrollContextProvider>
              :
              <UnverifiedRoutes />
            :
            <InitialRoutes />
          }
      </RootSiblingParent>
    </NavigationContainer>
  )
}