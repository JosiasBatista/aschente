import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { ShowChallenge } from '../screens/ShowChallenge';
import { ChallengeActivities } from '../screens/ChallengeActivities';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="showChallenge"
        component={ShowChallenge}
      />
      <Screen
        name="challengeActivities"
        component={ChallengeActivities}
      />
    </Navigator>
  )
}