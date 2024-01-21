import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import UserContext from '../../context/UserContext';
import { CurrentChallenge } from '../../components/CurrentChallenge';
import { ChallengesList } from '../../components/ChallengesList';
import { Challenge, getExistentChallenges } from '../../service/challenges';
import { THEME } from '../../theme';

export function Home() {
  const [challenges, setChallenges] = useState<Challenge[] | null>()
  const [loading, setLoading] = useState<boolean>(true);
  const { userRegistered } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    fetchForChallenges()
  }, [userRegistered])

  const fetchForChallenges = () => {
    getExistentChallenges(userRegistered.id).then((challenges) => {
      setChallenges(challenges)
    }).catch(() => {
      setChallenges(null);
    }).finally(() => {
      setLoading(false);
    });
  }

  const goToAddChallenge = () => {
    navigation.navigate("createChallenge")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.greetingCont}>
        <Text style={styles.greetingsTitle}>Hey, 
          <Text style={styles.greetingUsername}> {userRegistered?.username}</Text>
        </Text>

        <Text style={styles.greetingsMessage}>Preparado para continuar evoluindo cada vez mais com os desafios?</Text>
      </View>

      <CurrentChallenge challenge={challenges?.find(chal => chal.id == userRegistered?.currentChallenge)} />

      <ChallengesList challenges={challenges || []} loading={loading} 
        refresh={
          <RefreshControl refreshing={loading} onRefresh={fetchForChallenges} />
        } 
      />

      <TouchableOpacity style={styles.addChallengeButton} onPress={goToAddChallenge}>
        <FontAwesome name="plus" color={THEME.COLORS.WHITE_TEXT} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}