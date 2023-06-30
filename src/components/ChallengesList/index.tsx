import { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import FontAwesomeOri from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Challenge, getExistentChallenges } from '../../service/challenges';
import { THEME } from '../../theme';

interface ChallengeListProps {
  challenges: Challenge[],
  loading: boolean
}

export function ChallengesList({ challenges, loading }: ChallengeListProps) {
  const navigation = useNavigation();

  if (challenges == null) {
    return (
      <View style={styles.errorCont}>
        <FontAwesome name="sad-tear" color="#303030" size={45} />
        <Text style={styles.errorTitle}>Houve um erro ao recuperar os desafios!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafios Disponíveis</Text>

      {loading ?
        <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY_RED} />
        :
        <FlatList
          data={challenges}
          numColumns={2}
          contentContainerStyle={styles.challengesCont}
          keyExtractor={(item) => String(item.id)}
          style={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={styles.errorCont}>
              <FontAwesome name="frown" color="#303030" size={45} />
              <Text style={styles.errorTitle}>Não há desafios! Volte depois.</Text>
            </View>
          )}
          renderItem={({item}) => (
            <TouchableOpacity style={[
                styles.challengeBox,
                item.difficulty == "pawn" && styles.whiteBox,
                item.difficulty == "rook" && styles.redBox,
                item.difficulty == "king" && styles.blackBox,
              ]}
              onPress={() => navigation.navigate("showChallenge", { challenge: item })}
            >
              <Text style={[styles.challengeTitle, item.difficulty == "pawn" && styles.blackTitle]}>{item.title}</Text>
  
              {item.difficulty == "pawn" && <FontAwesome name="chess-pawn" color="#D6D5D5" size={90} style={styles.challengeIcon} />}
              {item.difficulty == "rook" && <FontAwesome name="chess-rook" color="#F53D2C" size={90} style={styles.challengeIcon} />}
              {item.difficulty == "king" && <FontAwesome name="chess-king" color="#1E1E1E" size={90} style={styles.challengeIcon} />}
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );
}