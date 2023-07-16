import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import loginRocket from '../../../assets/login-rocket.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import { THEME } from '../../../theme';
import { useSignIn } from '../../../hook/useSignIn';
import Toast from 'react-native-root-toast';

interface LoginInfos {
  email: string,
  password: string
}

type FormKey = "email" | "password"

export function Login() {
  const [{ isLoading, error }, signIn] = useSignIn();
  const [signUpForm, setSignUpForm] = useState<LoginInfos>({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (error) {
      Toast.show("Houve um erro ao realizar o login!")
    }
  }, [error])

  const navigation = useNavigation();

  const makeRedirection = (routeName: "login" | "signup") => {
    navigation.navigate(routeName);
  }

  const setFormValue = (formKey: FormKey, formValue: string) => {
    const newForm = {...signUpForm};

    newForm[formKey] = formValue;

    setSignUpForm(newForm);
  }

  const makeLogin = () => {
    signIn({ email: signUpForm.email, password: signUpForm.password })
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
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
          onChangeText={(text) => setFormValue("email", text)}
        />

        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
          onChangeText={(text) => setFormValue("password", text)}
        />
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button text="Acessar" redButton={true} isLoading={isLoading} onPress={makeLogin} />

        <TouchableOpacity onPress={() => makeRedirection("signup")}>
          <Text style={styles.alreadyHaveAccountLink}>Não possuo conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}