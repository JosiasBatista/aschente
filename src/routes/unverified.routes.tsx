import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EmailValidation } from '../screens/InitialRoutes/EmailValidation';

const { Navigator, Screen } = createNativeStackNavigator();

export function UnverifiedRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="emailValidation"
        component={EmailValidation}
      />
    </Navigator>
  )
}