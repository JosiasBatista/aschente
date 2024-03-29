import { useNavigationState } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

import { Home } from '../screens/Home';
import { ShowChallenge } from '../screens/ShowChallenge';
import { ChallengeActivities } from '../screens/ChallengeActivities';
import { Profile } from '../screens/Profile';
import { EditProfile } from '../screens/EditProfile';
import { MainChallengeInfos } from '../screens/CreateChallenge/MainInfos';

import { THEME } from '../theme';
import { DifficultyAndTime } from '../screens/CreateChallenge/DifficultyAndTime';
import { EditChallenge } from '../screens/EditChallenge';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  const index = useNavigationState(state => state?.index);

  return (
    <Navigator screenOptions={({ navigation }) => ({
      presentation: "modal",
      headerStyle: {
          backgroundColor: '#FFF',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS,
      },
      headerTintColor: '#FFF',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerBackTitleVisible: false,
      headerLeft: () => {
        if (index && index != 0) 
          return (
            <HeaderBackButton
                labelVisible={false}
                tintColor={THEME.COLORS.PRIMARY_RED}
                onPress={() => navigation.goBack()}
            />
          )
      }
    })}>
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
      <Screen
        name="userProfile"
        component={Profile}
      />
      <Screen
        name="editProfile"
        component={EditProfile}
      />
      <Screen
        name="createChallenge"
        component={MainChallengeInfos}
      />
      <Screen
        name="challengeDifficultyAndTime"
        component={DifficultyAndTime}
      />
      <Screen
        name="editChallenge"
        component={EditChallenge}
      />
    </Navigator>
  )
}