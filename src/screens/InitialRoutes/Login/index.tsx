import React from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import loginRocket from '../../../assets/login-rocket.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import { THEME } from '../../../theme';

export function Login() {
  
  const navigation = useNavigation();

  const makeRedirection = (routeName: "login" | "signup") => {
    navigation.navigate(routeName);
  }
  
  return (
    <View style={styles.container}>
      <FontAwesome name="chess-rook" size={25} color={THEME.COLORS.PRIMARY_RED} />

      <View style={styles.onboardingTitleCont}>
        <Text style={styles.bigText}>BEM VINDO</Text>
        <Text style={styles.normalText}>de volta</Text>
      </View>

      <KeyboardAvoidingView behavior="position" enabled contentContainerStyle={styles.contentCont}>
        <Image
          source={loginRocket}
          defaultSource={loginRocket}
          style={styles.onboardingImage}
        />
        
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
        />

        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
        />
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button text="Acessar" redButton={true} />

        <TouchableOpacity onPress={() => makeRedirection("signup")}>
          <Text style={styles.alreadyHaveAccountLink}>Não possuo conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}