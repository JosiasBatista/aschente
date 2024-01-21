import { useState, useContext } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View, Switch, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Header } from '../../../components/Header';
import { THEME } from '../../../theme';
import { Button } from '../../../components/Button';
import ChallengeCreationContext from '../../../context/ChallengeCreationContext';

export type ChallengeCreationProps = {
  title: string,
  description: string,
  isPublic: boolean,
  activities: string[]
}

type ChallengeTypes = keyof ChallengeCreationProps

interface FormItemProps {
  label: string,
  placeholder: string,
  valueName: ChallengeTypes,
  setValue: (fieldName: ChallengeTypes, value: string | boolean) => void,
  numberOfLines?: number
}

const FormItem = ({label, placeholder, valueName, setValue, numberOfLines = 1}: FormItemProps) => {
  return (
    <View style={styles.formItemCont}>
      <Text style={styles.formItemLabel}>{label}</Text>
  
      <TextInput
        placeholder={placeholder}
        style={[styles.input, numberOfLines > 1 ? {textAlignVertical: 'top'} : null]}
        placeholderTextColor={THEME.COLORS.PLACEHOLDER}
        onChangeText={(text) => setValue(valueName as ChallengeTypes, text)}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}

export function MainChallengeInfos() {
  const { setChallenge } = useContext(ChallengeCreationContext);
  const [formValues, setFormValues] = useState<ChallengeCreationProps>({
    title: "",
    description: "",
    isPublic: false,
    activities: []
  });
  const [newActivity, setNewActivity] = useState<string>("");
  const navigation = useNavigation();

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

  const proceedToNextPage = () => {
    setChallenge({
      ...formValues,
      days: 0,
      difficulty: null
    })

    navigation.navigate("challengeDifficultyAndTime");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.pageTitleCont}>
          <Text style={styles.normalText}>Está na hora de criar um novo</Text>
          <Text style={styles.bigText}>DESAFIO.</Text>
        </View>
        
        <View style={styles.switchContainer}>
          <Text style={styles.formItemLabel}>Tornar desafio público?</Text>

          <Switch 
            trackColor={{ false: THEME.COLORS.GREY_TEXT, true: THEME.COLORS.PRIMARY_RED }}
            thumbColor={THEME.COLORS.WHITE_TEXT}
            value={formValues.isPublic}
            onChange={() => setValue("isPublic", !formValues.isPublic)}
          />
        </View>

        <KeyboardAvoidingView behavior="position" enabled contentContainerStyle={styles.formContent}>
          <FormItem
            label="Nome do desafio"
            placeholder="Meu desafio"
            valueName="title"
            setValue={setValue}
          />

          <FormItem
            label="Descrição do desafio"
            placeholder="Desafio de gratidão e organização"
            valueName="description"
            numberOfLines={5}
            setValue={setValue}
          />

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, marginBottom: 16 }}>
              <TextInput
                value={newActivity}
                placeholder="Nova atividade"
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

        <View style={styles.creationButtonCont}>
          <Button text="Continuar" redButton={true} onPress={proceedToNextPage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}