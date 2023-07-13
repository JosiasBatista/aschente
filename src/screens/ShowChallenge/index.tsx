import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import Wave from 'react-native-waveview';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { Challenge, ChallengeEnrollment, enrollUserInChallenge, getChallengeEnrollment } from '../../service/challenges';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';
import { Button } from '../../components/Button';
import Toast from 'react-native-root-toast';
import ChallengeEnrollContext from '../../context/ChallengeEnrollContext';

interface ChallengeDay {
  dayNumber: number,
  title: string,
  id: string
}

export function ShowChallenge() {
  const { userRegistered } = useContext(UserContext);
  const { challengeEnrollment: userEnrolled } = useContext(ChallengeEnrollContext); 
  const [challengeEnrollment, setChallengeEnrollment] = useState<ChallengeEnrollment>();
  const [days, setDays] = useState<ChallengeDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number | null>(null);
  const listRef = useRef<FlatList>(null);
  const waveRef = useRef<unknown>(null);

  const route = useRoute();
  const navigation = useNavigation();
  const { challenge } = route.params as { challenge: Challenge }; 

  useEffect(() => {
    if (userEnrolled?.challengeId == challenge.id) {
      setChallengeEnrollment(userEnrolled || null)
    } else {
      getChallengeEnrollment(userRegistered.email, challenge.id, (value) => setChallengeEnrollment(value));
    }
    mountChallengeDays(challenge.days);
  }, [])

  useEffect(() => {
    if (days.length > 0) {
      setIndex(challengeEnrollment ? challengeEnrollment.currentDay - 1 : 0)
      getWaveSize()
    }
  }, [days])

  const mountChallengeDays = (daysAmount: number) => {
    const challengeDays: ChallengeDay[] = [];

    for (let i = 1; i <= daysAmount; i++) {
      challengeDays.push({
        id: i + "",
        dayNumber: i,
        title: ` dia do desafio`
      })
    }

    setDays(challengeDays);
  }

  const isCompletedDay = (dayNumber: number) => {
    if (!challengeEnrollment) return null;

    if (challengeEnrollment.currentDay > dayNumber) {
      return styles.completedDay;
    }
  }

  const isFutureDay = (dayNumber: number) => {
    if (!challengeEnrollment) return null;

    if (challengeEnrollment.currentDay < dayNumber) {
      return styles.futureDay;
    }
  }

  const isCurrentDay = (dayNumber: number) => {
    if (!challengeEnrollment) return null;

    if (challengeEnrollment.currentDay == dayNumber) {
      return styles.whiteText;
    }
  }

  const getWaveSize = () => {
    const barPercentage = challengeEnrollment?.percentage || 0;

    waveRef && (waveRef.current as any).setWaterHeight(((THEME.SIZES.SCREEN_WIDTH * 0.9) * (barPercentage / 100)))
  }

  const countRemainingActivity = () => {
    let remainingActivities = 0;

    if (challengeEnrollment?.finished) {
      return "Finalizado"
    }

    Object.entries(challengeEnrollment?.enrollmentActivities || {}).forEach(([, activity]) => {
      const activityStatus = Object.values(activity)[0]
      
      if (!activityStatus) {
        remainingActivities += 1;
      }
    })

    return "Faltam " + remainingActivities + " atividades";
  }

  const makeEnrollment = () => {
    setLoading(true);
    enrollUserInChallenge(userRegistered.email, challenge, challenge.activities).then((response) => {
      if (!response) {
        showErrorMessageInSubscription();
      } else {
      }
    })
    .catch(() => {
      showErrorMessageInSubscription();
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const showErrorMessageInSubscription = () => {
    Toast.show("Erro na inscrição", {
      duration: Toast.durations.LONG
    })
  }

  const redirectToDayActivities = (item: ChallengeDay) => {
    if (item.dayNumber != challengeEnrollment?.currentDay) return;

    navigation.navigate("challengeActivities", {
      challengeEnrollment: challengeEnrollment
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />  
      
      <View style={styles.challengeHeader}>
        {challenge.difficulty == "pawn" && <FontAwesome name="chess-pawn" color="#D6D5D5" size={190} style={styles.challengeIcon} />}
        {challenge.difficulty == "rook" && <FontAwesome name="chess-rook" color="#D6D5D5" size={190} style={styles.challengeIcon} />}
        {challenge.difficulty == "king" && <FontAwesome name="chess-king" color="#D6D5D5" size={190} style={styles.challengeIcon} />}

        <View style={styles.challengeMainInfos}>
          <Text style={styles.challengeName}>{challenge.title}</Text>
          <Text style={styles.challengeDesc}>{challenge.description}</Text>
        </View>

        <View style={styles.challengeStatusContainer}>
          <Wave
            style={styles.waveStyle}
            ref={waveRef}
            H={0}
            waveParams={[
                {A: 8, T: 250, fill: THEME.COLORS.PRIMARY_RED}
            ]}
            animated={true}
          />
          <Text style={styles.percentageNum}>{parseFloat((challengeEnrollment?.percentage|| 0).toFixed(2))}%<Text style={styles.percentageText}> Concluído</Text></Text>
          <Text style={styles.currentChallengeDay}>Atualmente no {challengeEnrollment?.currentDay || 0}º dia do desafio</Text>
        </View>

      </View>

      {loading ?
        <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY_RED} style={{ marginTop: 24 }} />
        :
        challengeEnrollment == null ?
          <View style={styles.notEnrolled}>
            <Text style={styles.notEnrolledText}>Você não está inscrito nesse desafio!</Text>
            <Text style={[ styles.notEnrolledText, { marginBottom: 16 } ]}>Quer embarcar na jornada?</Text>
            <Button 
              text="Embarcar" 
              redButton={true} 
              onPress={makeEnrollment} 
            />
          </View>
          :
          (days.length > 0 && index != null) &&
            <FlatList 
              data={days}
              ref={listRef}
              removeClippedSubviews={false}
              initialNumToRender={5}
              initialScrollIndex={index}
              onScrollToIndexFailed={() => setIndex(0)}
              keyExtractor={(item) => item.id}
              getItemLayout={(data, index) => ({
                length: 136,
                offset: 136 * index,
                index
              })}
              renderItem={({item}) => (
                <TouchableOpacity 
                  onPress={() => redirectToDayActivities(item)}
                  style={[styles.challengeDayCont, 
                    isCompletedDay(item.dayNumber),
                    isFutureDay(item.dayNumber)
                  ]}
                >
                  <Text style={[styles.percentageNum, isCurrentDay(item.dayNumber)]}>
                    {item.dayNumber}º
                    <Text style={[styles.percentageText, isCurrentDay(item.dayNumber)]}>{item.title}</Text>
                  </Text>
                  {challengeEnrollment?.currentDay == item.dayNumber && (
                    <Text style={styles.remainingActivities}>{countRemainingActivity()}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
      }
      
    </SafeAreaView>
  );
}