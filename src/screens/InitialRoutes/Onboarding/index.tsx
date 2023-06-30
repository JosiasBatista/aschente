import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import onboardingRocket from '../../../assets/onboarding-rocket.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';

export function Onboarding() {
  const navigation = useNavigation();

  const makeRedirection = (routeName: "login" | "signup") => {
    navigation.navigate(routeName);
  }

  return (
    <View style={styles.container}>
      <FontAwesome name="chess-rook" size={25} color="#FFF" />

      <View style={styles.onboardingTitleCont}>
        <Text style={styles.normalText}>Qual o próximo</Text>
        <Text style={styles.bigText}>DESAFIO?</Text>
      </View>

      <View style={styles.imageCont}>
        <Image
          source={onboardingRocket}
          defaultSource={onboardingRocket}
          style={styles.onboardingImage}
        />
        <Text style={styles.normalText}>Eleve o seu nível</Text>
      </View>

      <View style={styles.footer}>
        <Button text="Fazer login" onPress={() => makeRedirection("login")} />
        
        <TouchableOpacity onPress={() => makeRedirection("signup")}>
          <Text style={styles.dontHaveAccountLink}>Não possuo conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}