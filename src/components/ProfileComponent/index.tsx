import { useEffect, useState, useContext } from 'react';
import { Image, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";

import { styles } from './styles';
import { UserDataProps } from '../../service/user';
import { CompletedChallenges, getUserChallengesCompleted } from '../../service/challenges';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../theme';
import { Header } from '../Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Timestamp } from 'firebase/firestore';
import UserContext from '../../context/UserContext';

interface ProfileComponentProps {
  user: UserDataProps
}

interface TypesCounter {
  pawn: number;
  rook: number;
  king: number
}

export function ProfileComponent({ user }: ProfileComponentProps) {
  const { userRegistered } = useContext(UserContext);
  const navigation = useNavigation();
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenges[]>([]);
  const [typesCounter, setTypesCounter] = useState<TypesCounter>({
    pawn: 0,
    rook: 0,
    king: 0
  })

  useEffect(() => {
    getUserChallengesCompleted(user.email).then((challengesCompleted) => {
      setCompletedChallenges(challengesCompleted);
    })
  }, []);

  useEffect(() => {
    const newCounter = {...typesCounter};
    completedChallenges.forEach((chal) => {
      newCounter[chal.difficulty] = 1;
    })

    setTypesCounter(newCounter);
  }, [completedChallenges]);

  const getPieceColor = (piece: "pawn" | "rook" | "king") => {
    if (piece == "pawn") return THEME.COLORS.LIGHT_BLACK
    else if (piece == "rook") return THEME.COLORS.PRIMARY_RED
    else if (piece == "king") return THEME.COLORS.BLACK_TEXT
    else return THEME.COLORS.BLACK_TEXT
  }

  const getFormattedDate = (timestamp: Timestamp) => {
    const date = typeof timestamp.toDate == 'function' ? timestamp.toDate() : timestamp;
  
    const formatedDate = moment(date).format('DD-MM-YYYY');  
    return formatedDate;
  }

  const goToEditProfile = () => {
    navigation.navigate("editProfile");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.userInfoCont}>
        {user.photo ?
          <Image source={{ uri: user.photo }} style={styles.userPhoto} />
          :
          <View style={styles.userPhoto}>
            <FontAwesome name="user" color={THEME.COLORS.DARKER_GREY} size={20} />
          </View>
        }

        <View>
          <Text style={styles.userName}>{user?.username}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {user.id == userRegistered.id &&
            <TouchableOpacity onPress={() => goToEditProfile()} style={styles.editProfileCont}>
              <FontAwesome name="cog" color={THEME.COLORS.PRIMARY_RED} />
              <Text style={styles.editProfileLink}>Editar Perfil</Text>
            </TouchableOpacity>
          }
        </View>
      </View>

      <View style={styles.counterContainer}>
        {Object.entries(typesCounter).map(typeCount => (
          <View style={styles.countItem} key={typeCount[0]}>
            <FontAwesome 
              name={`chess-${typeCount[0]}`} 
              color={getPieceColor(typeCount[0] as "pawn" | "rook" | "king")} 
            />
            <Text>{typeCount[0]}: {typeCount[1]}</Text>
          </View>
        ))}
      </View>

      <FlatList
        data={completedChallenges}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.challengesCont}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View style={styles.challengeItem}>
            <FontAwesome 
              name={`chess-${item.difficulty}`} 
              color={getPieceColor(item.difficulty as "pawn" | "rook" | "king")} 
              size={65}
            />

            <View>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text style={styles.challengeDate}>{getFormattedDate(item.finish?.finishDate)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}