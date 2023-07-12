import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';
import { Challenge, checkChallengeEnrollAndUpdate } from '../../service/challenges';
import ChallengeEnrollContext from '../../context/ChallengeEnrollContext';

export function CurrentChallenge({ challenge }: { challenge: Challenge | undefined }) {
  const { challengeEnrollment } = useContext(ChallengeEnrollContext);
  const { userRegistered } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (challengeEnrollment && challenge) {
      checkChallengeEnrollAndUpdate(challengeEnrollment, challenge.days || null, userRegistered);
    }
  }, [challenge, challengeEnrollment])

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => challengeEnrollment && navigation.navigate("showChallenge", { challenge: challenge })}
    >
      {
        challengeEnrollment ?
          <>
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>{challenge?.title}</Text>
              <Text style={styles.challengeDesc}>{challenge?.description}</Text>
            </View>

            <AnimatedCircularProgress
              size={90}
              width={5}
              fill={challengeEnrollment.percentage || 1}
              tintColor='#000'
              onAnimationComplete={() => console.log('onAnimationComplete')}
            >
              {() => (
                <Text style={styles.challengePercentage}>{parseFloat(challengeEnrollment.percentage.toFixed(1))}%</Text>
              )}
            </AnimatedCircularProgress>
          </>
          :
          <View style={styles.notEnrolledCont}>
            <FontAwesome name="surprise" color="#FFF" size={45} style={{ marginBottom: 16 }} />
            <Text style={styles.challengeTitle}>Você ainda não faz parte de um desafio! Inscreva-se agora e faça seu futuro decolar!</Text>
          </View>
      }
    </TouchableOpacity>
  );
}