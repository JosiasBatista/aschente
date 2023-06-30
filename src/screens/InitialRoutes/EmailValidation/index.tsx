import { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import chessMatch from '../../../assets/chess.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import UserContext from '../../../context/UserContext';

export function EmailValidation() {
  const { reload, isLoading } = useContext(UserContext);

  const navigation = useNavigation();

  const makeRedirection = (routeName: "login" | "signup") => {
    navigation.navigate(routeName);
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
        <Button text="Já confirmei" isLoading={isLoading} onPress={reload} />
        
        <TouchableOpacity onPress={() => makeRedirection("signup")}>
          <Text style={styles.dontHaveAccountLink}>Reenviar email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}