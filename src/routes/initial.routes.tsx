import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Onboarding } from '../screens/InitialRoutes/Onboarding';
import { Login } from '../screens/InitialRoutes/Login';
import { SignUp } from '../screens/InitialRoutes/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function InitialRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="onboarding"
        component={Onboarding}
      />
      <Screen
        name="login"
        component={Login}
      />
      <Screen
        name="signup"
        component={SignUp}
      />
    </Navigator>
  )
}