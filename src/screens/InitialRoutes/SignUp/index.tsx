import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import loginRocket from '../../../assets/signup-rocket.png';
import { styles } from './styles';
import { Button } from '../../../components/Button';
import { THEME } from '../../../theme';
import { useSignUp } from '../../../hook/useSignUp';
import { registerUser } from '../../../service/user';

interface SignUpInfos {
  email: string,
  password: string,
  passwordConfirmation: string,
  username: string
}

type FormKey = 'email' | 'password' | 'passwordConfirmation' | 'username';

export function SignUp() {
  const [signUpForm, setSignUpForm] = useState<SignUpInfos>({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: ""
  })
  const [{ error }, signUp] = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const errorEnum = {
    emailError: "Há um erro no seu email!",
    passError: "Sua senha precisa ter mais de 5 caracteres",
    passConfirmErro: "Confirmação de senha não coincide",
    infosError: "Todas as informações são obrigatórias"
  }

  const makeRedirection = (routeName: "login" | "signup") => {
    navigation.navigate(routeName);
  }

  const setFormValue = (formKey: FormKey, formValue: string) => {
    const newForm = {...signUpForm};

    newForm[formKey] = formValue;

    setSignUpForm(newForm);
  }

  const emailValidator = () => {
    return String(signUpForm.email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  const passValidator = () => {
    return (signUpForm.password.length > 5);
  }

  const checkPassConfirmation = () => {
    return signUpForm.password === signUpForm.passwordConfirmation;
  }

  const checkSignUpInfos = () => {
    if (!emailValidator()) return "emailError" 

    if (!passValidator()) return "passError"

    if (!checkPassConfirmation()) return "passConfirmErro";

    if (!signUpForm.username) return "infosError"

    return "sucesso";
  }

  const makeSignUp = () => {
    const signUpCheck = checkSignUpInfos();

    if (signUpCheck != "sucesso") {
      Toast.show(errorEnum[signUpCheck])
      return;
    } else {
      setIsLoading(true);
      const signUpInfos = {
        email: signUpForm.email,
        password: signUpForm.password
      };

      signUp(signUpInfos).then(async () => {
        const registrationInfos = {
          ...signUpInfos,
          username: signUpForm.username
        }

        await registerUser(registrationInfos);
        setIsLoading(false);
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
      <FontAwesome name="chess-rook" size={25} color={THEME.COLORS.PRIMARY_RED} />

      <View style={styles.onboardingTitleCont}>
        <Text style={styles.normalText}>Vamos iniciar a</Text>
        <Text style={styles.bigText}>JORNADA</Text>
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

        <TextInput
          placeholder="Confirmação de Senha"
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
          onChangeText={(text) => setFormValue("passwordConfirmation", text)}
        />

        <TextInput
          placeholder="Nome de Usuário"
          style={styles.input}
          value={signUpForm.username}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
          onChangeText={(text) => setFormValue("username", text.toLocaleLowerCase())}
          autoCapitalize="none"
          secureTextEntry={true}
          keyboardType={"visible-password"}
        />
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button text="Criar conta" isLoading={isLoading} redButton={true} onPress={makeSignUp} />

        <TouchableOpacity onPress={() => makeRedirection("login")}>
          <Text style={styles.alreadyHaveAccountLink}>Já possuo conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}