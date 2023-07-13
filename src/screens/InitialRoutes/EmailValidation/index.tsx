import { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import chessMatch from '../../../assets/chess.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import UserContext from '../../../context/UserContext';
import { deleteFirebaseUser, sendVerification } from '../../../service/user';
import Toast from 'react-native-root-toast';

export function EmailValidation() {
  const { reload, isLoading, removeUser } = useContext(UserContext);

  const navigation = useNavigation();

  const makeRedirection = async () => {
    // navigation.navigate(routeName);
    const isRemoved = await removeUser();
  
    if (isRemoved) {
      deleteFirebaseUser()?.catch(() => {
        Toast.show("Houve um erro ao retornar! Tente novamente")
      });
    } else {
      Toast.show("Houve um erro ao retornar! Tente novamente")
    }
  }

  const resendVerification = () => {
    sendVerification()?.then(() => {
      Toast.show("Email reenviado")
    }).catch(() => {
      Toast.show("Espere um pouco antes de tentar novamente!")
    })
  } 

  return (
    <View style={styles.container}>
      <FontAwesome name="chess-rook" size={25} color="#FFF" />

      <View style={styles.imageCont}>
        <Image
          source={chessMatch}
          defaultSource={chessMatch}
          style={styles.onboardingImage}
        />

        <Text style={styles.bigText}>Precisamos validar o seu Email</Text>
        <Text style={styles.normalText}>Para garantir a sua identidade precisamos que você confirme seu cadastro através do email recebido em sua conta.</Text>
      </View>

      <View style={styles.footer}>
        <Button text="Já confirmei" isLoading={isLoading} onPress={reload} specificStyle={{ marginBottom: 12 }} />
        
        <TouchableOpacity onPress={() => resendVerification()}>
          <Text style={styles.dontHaveAccountLink}>Reenviar email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => makeRedirection()}>
          <Text style={[styles.dontHaveAccountLink, styles.retryButton]}>Retornar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}