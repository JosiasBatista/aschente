import { ScrollView, Text, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { THEME } from '../../theme';
import { ChallengeEnrollment, updateUserEnrollment } from '../../service/challenges';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';

export function ChallengeActivities() {
  const route = useRoute();
  const { challengeEnrollment: enrollmentRecieved } = route.params as { challengeEnrollment: ChallengeEnrollment }
  const [challengeEnrollment, setChallengeEnrollment] = useState<ChallengeEnrollment>(enrollmentRecieved);
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      updateUserEnrollment(challengeEnrollment?.id || "", challengeEnrollment.enrollmentActivities);
    }
  }, [])

  const changeActivityValue = (index: number, activityName: string) => {
    const newChallengeEnrollment = {...challengeEnrollment};

    newChallengeEnrollment.enrollmentActivities[index][activityName] = 
      !newChallengeEnrollment.enrollmentActivities[index][activityName];
    setChallengeEnrollment(newChallengeEnrollment)
  }

  const checkAllActivities = () => {
    const newActivities = challengeEnrollment.enrollmentActivities.map((activity) => {
      activity[Object.keys(activity)[0]] = true

      return activity
    })

    const newEnrollment = {
      ...challengeEnrollment,
      enrollmentActivities: newActivities
    }

    setChallengeEnrollment(newEnrollment)
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <Text style={styles.pageTitle}>Atividades</Text>
      <Text style={styles.currentDayText}>{challengeEnrollment.currentDay}º dia</Text>
      
      <ScrollView contentContainerStyle={styles.activitiesContainer}>
        {challengeEnrollment.enrollmentActivities.map((activity, index) => (
          <View 
            key={index}
            style={{
              width: THEME.SIZES.SCREEN_WIDTH * 0.9,
              borderRadius: 20,
              backgroundColor: THEME.COLORS.BLACK_TEXT,
              marginVertical: 5,
              padding: 15
            }}>
            <BouncyCheckbox
              size={25}
              fillColor={THEME.COLORS.PRIMARY_RED}
              disableBuiltInState
              isChecked={Object.values(activity)[0]}
              unfillColor="#FFFFFF"
              text={Object.keys(activity)[0]}
              iconStyle={{ borderColor: THEME.COLORS.PRIMARY_RED }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ fontFamily: THEME.FONT_FAMILY.MEDIUM, color: THEME.COLORS.WHITE_TEXT }}
              onPress={() => changeActivityValue(index, Object.keys(activity)[0])}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button text="Finalizar todas" onPress={checkAllActivities} redButton={false} />
        <Button text="Salvar" onPress={() => navigation.goBack()} redButton={true} />
      </View>
    </SafeAreaView>
  );
}