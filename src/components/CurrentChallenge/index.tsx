import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';
import { Challenge, ChallengeEnrollment, getChallengeEnrollment } from '../../service/challenges';

export function CurrentChallenge({ challenges }: { challenges: Challenge[] }) {
  const [currentUserChallenge, setCurrentUserChallenge] = useState<Challenge>();
  const [challengeEnrollment, setChallengeEnrollment] = useState<ChallengeEnrollment | null>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { userRegistered } = useContext(UserContext);

  useEffect(() => {
    setCurrentUserChallenge(challenges.find((chal) => {
      return chal.id == userRegistered.currentChallenge;
    }))

    getChallengeEnrollment(userRegistered.email, userRegistered.currentChallenge)
      .then((challengeEnroll) => {
        setChallengeEnrollment(challengeEnroll)
      })
      .catch(() => {
        setChallengeEnrollment(null);
      }).finally(() => {
        setLoading(false);
      })
  }, [navigation])

  return (
    <View style={styles.container}>
      {loading ?
        <ActivityIndicator size="large" color={THEME.COLORS.WHITE_TEXT} />
        :
        challengeEnrollment ?
          <>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{currentUserChallenge?.title}</Text>
              <Text style={styles.challengeDesc}>{currentUserChallenge?.description}</Text>
            </View>

            <AnimatedCircularProgress
              size={90}
              width={5}
              fill={challengeEnrollment.percentage || 1}
              tintColor='#000'
              onAnimationComplete={() => console.log('onAnimationComplete')}
            >
              {() => (
                <Text style={styles.challengePercentage}>{challengeEnrollment.percentage}%</Text>
              )}
            </AnimatedCircularProgress>
          </>
          :
          <View style={styles.notEnrolledCont}>
            <FontAwesome name="surprise" color="#FFF" size={45} style={{ marginBottom: 16 }} />
            <Text style={styles.challengeTitle}>Você ainda não faz parte de um desafio! Inscreva-se agora e faça seu futuro decolar!</Text>
          </View>
      }
    </View>
  );
}