import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { FormItem } from '../../components/FormItem';
import { ChallengeCreationProps } from '../CreateChallenge/MainInfos';
import { CHALLENGE_DIFFICULTY_VALUES, Challenge, ChallengeCreation, editChallenge } from '../../service/challenges';
import { THEME } from '../../theme';
import { Button } from '../../components/Button';
import Toast from 'react-native-root-toast';

type ChallengeTypes = keyof ChallengeCreationProps

export function EditChallenge() {
  const route = useRoute();
  const navigation = useNavigation();
  const { challenge } = route.params as { challenge: Challenge };

  const [formValues, setFormValues] = useState<ChallengeCreationProps>({
    title: challenge?.title,
    description: challenge?.description,
    isPublic: challenge?.isPublic,
    activities: challenge?.activities,
    difficulty: challenge?.difficulty,
    days: challenge?.days
  });
  const [newActivity, setNewActivity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setValue = (fieldName: ChallengeTypes, value: string | boolean | string[]) => {
    const newForm = {...formValues, [fieldName]: value};

    setFormValues(newForm);
  }

  const addActivitie = () => {
    if (newActivity === "") return;

    const newActivities = formValues.activities;
    newActivities.push(newActivity);

    setValue("activities", newActivities);
    setNewActivity("");
  }

  const callEditChallenge = () => {
    setLoading(true);

    const updatedChallenge: ChallengeCreation = {
      ...challenge,
      title: formValues.title,
      description: formValues.description,
      activities: formValues.activities,
      difficulty: formValues.difficulty as "pawn" | "rook" | "king",
      days: formValues.days || 0
    }

    editChallenge(updatedChallenge, challenge.id).then((response) => {
      Toast.show("Desafio editado com sucesso!")
      
      navigation.navigate("showChallenge", { challenge: response })
    }).catch((error) => {
      console.log(error)
      Toast.show("Erro ao editar, tente novamente!")
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.pageTitleCont}>
        <Text style={styles.normalText}>Edição de desafio.</Text>
      </View>
      <ScrollView>
    
        <KeyboardAvoidingView behavior="position" enabled contentContainerStyle={styles.formContainer}>
          <FormItem
            label="Nome do desafio"
            placeholder="Meu desafio..."
            valueName="title"
            defaultValue={formValues.title}
            setValue={setValue}
          />

          <FormItem
            label="Descrição do desafio"
            placeholder="Desafio de gratidão e organização..."
            valueName="description"
            defaultValue={formValues.description}
            numberOfLines={5}
            setValue={setValue}
          />

          <FormItem
            label="Quantidade de dias do desafio"
            placeholder="30..."
            valueName="days"
            defaultValue={formValues.days ? formValues.days.toString() : ""}
            setValue={setValue}
          />

          <Text style={styles.formItemLabel}>Qual o nível do desafio?</Text>
          <View style={styles.difficultyButtonContainer}>
            {CHALLENGE_DIFFICULTY_VALUES.map(difficultyValue => (
              <TouchableOpacity 
                style={[styles.difficultyButton, difficultyValue === formValues.difficulty ? styles.selectedDifficulty : null]} 
                onPress={() => setValue("difficulty", difficultyValue as "pawn" | "rook" | "king")}
                key={difficultyValue}
              >
                <FontAwesome name={`chess-${difficultyValue}`} 
                  color={difficultyValue === formValues.difficulty ? THEME.COLORS.WHITE_TEXT : "#D6D5D5"} 
                  size={60}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 16 }}>
              <TextInput
                value={newActivity}
                placeholder="Nova atividade..."
                style={[styles.input, { width: THEME.SIZES.SCREEN_WIDTH * 0.7, marginTop: 0 }]}
                placeholderTextColor={THEME.COLORS.PLACEHOLDER}
                onChangeText={(text) => setNewActivity(text)}
              />

              <TouchableOpacity style={styles.addActivitieButton} onPress={addActivitie}>
                <FontAwesome name="plus" color={THEME.COLORS.WHITE_TEXT} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View>
          {formValues.activities.map((activity, key) => (
            <View key={key} style={styles.challengeActivity}>
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          text="Editar"
          isLoading={loading}
          redButton={true}
          onPress={callEditChallenge}
        />
      </View>
    </SafeAreaView>
  );
}