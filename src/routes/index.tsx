import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import UserContext, { UserContextProvider } from '../context/UserContext';
import { AppRoutes } from './app.routes';
import { InitialRoutes } from './initial.routes';
import { UnverifiedRoutes } from './unverified.routes';
import { Loading } from '../components/Loading';

export function Routes() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading || (isLoading == undefined && user == undefined)) 
    return <Loading />

  return (
    <NavigationContainer>
      <RootSiblingParent>
          {user ?
            user.emailVerified ?
              <AppRoutes />
              :
              <UnverifiedRoutes />
            :
            <InitialRoutes />
          }
      </RootSiblingParent>
    </NavigationContainer>
  )
}