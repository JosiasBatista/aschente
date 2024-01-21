import { useState, useContext } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '../../../components/Header';
import { THEME } from '../../../theme';
import { CHALLENGE_DIFFICULTY_VALUES, ChallengeCreation, createNewChallenge } from '../../../service/challenges';
import { Button } from '../../../components/Button';
import ChallengeCreationContext from '../../../context/ChallengeCreationContext';
import Toast from 'react-native-root-toast';
import UserContext from '../../../context/UserContext';

type FormProps = {
  days: number,
  difficulty: "pawn" | "rook" | "king" | null
}

type FormKeys = keyof FormProps;

export function DifficultyAndTime() {
  const { challenge, setChallenge } = useContext(ChallengeCreationContext);
  const { userRegistered } = useContext(UserContext);
  const [formValues, setFormValues] = useState<FormProps>({
    days: 0,
    difficulty: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const updateFormValue = (key: FormKeys, value: number | ("pawn" | "rook" | "king")) => {
    const newForm = {...formValues, [key]: value};

    setFormValues(newForm);
  }

  const createChallenge = () => {
    setLoading(true);
    if (formValues.days === 0 || formValues.difficulty === null) {
      Toast.show("Preencha os dias e selecione a dificuldade", {
        duration: Toast.durations.LONG
      })
      setLoading(false);
      return;
    }

    const updatedChallenge = {
      ...challenge,
      days: formValues.days,
      difficulty: formValues.difficulty as "pawn" | "rook" | "king",
      creatorId: userRegistered.id
    } as ChallengeCreation

    createNewChallenge(updatedChallenge).then(() => {
      navigation.navigate("home")
    }).catch(() => {
      Toast.show("Erro ao criar desafio!");
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.pageTitleCont}>
          <Text style={styles.normalText}>Está na hora de criar um novo</Text>
          <Text style={styles.bigText}>DESAFIO.</Text>
        </View>
      
        <KeyboardAvoidingView behavior="position" enabled style={styles.formCont}>
          <Text style={styles.formItemLabel}>Quantos dias terão esse desafio?</Text>
  
          <TextInput
            // value={formValues.days.toString()}
            placeholder="Nova atividade"
            style={styles.input}
            placeholderTextColor={THEME.COLORS.PLACEHOLDER}
            onChangeText={(text) => updateFormValue("days", parseInt(text))}
          />

          <Text style={styles.formItemLabel}>Qual o nível do desafio?</Text>

          <View style={styles.difficultyButtonContainer}>
            {CHALLENGE_DIFFICULTY_VALUES.map(difficultyValue => (
              <TouchableOpacity 
                style={[styles.difficultyButton, difficultyValue === formValues.difficulty ? styles.selectedDifficulty : null]} 
                onPress={() => updateFormValue("difficulty", difficultyValue as "pawn" | "rook" | "king")}
              >
                <FontAwesome name={`chess-${difficultyValue}`} 
                  color={difficultyValue === formValues.difficulty ? THEME.COLORS.WHITE_TEXT : "#D6D5D5"} 
                  size={60}
                />
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.formItemLabel}>Resumo</Text>
        
        <View style={styles.challengeSummaryCont}>
          <View style={styles.challengeInfo}>
            <Text style={styles.challengeTitle}>
              {challenge?.title}{"  "}
              {formValues.difficulty !== null && 
                <FontAwesome name={`chess-${formValues.difficulty}`} 
                  color={THEME.COLORS.WHITE_TEXT} 
                  size={18}
                />
              }
            </Text>
            <Text style={styles.challengeDesc}>{challenge?.description}</Text>
          </View>

          <AnimatedCircularProgress
            size={90}
            width={5}
            fill={100}
            tintColor={THEME.COLORS.WHITE_TEXT}
          >
            {() => (
              <View>
                <Text style={styles.amountOfDays}>{formValues.days}</Text>
                <Text style={styles.daysLabel}>dias</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          text="Criar"
          isLoading={loading}
          redButton={true}
          onPress={createChallenge}
        />
      </View>
    </SafeAreaView>
  );
}