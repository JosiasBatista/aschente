import { useContext, useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import { styles } from './styles';
import UserContext from '../../context/UserContext';
import { THEME } from '../../theme';
import { Button } from '../../components/Button';
import { getImage } from '../../utils/photo';
import { updateUserProfile } from '../../service/user';

import adjustChess from '../../assets/adjustchess.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type FormKey = 'username' | 'motivationalSentence';

export function EditProfile() {
  const { userRegistered } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<{
    username: string,
    motivationalSentence: string
  }>({ username: userRegistered.username, motivationalSentence: userRegistered.motivationalSentence || "" });
  const [newImage, setNewImage] = useState<string>("");
  const navigation = useNavigation();

  const setFormValue = (formKey: FormKey, formValue: string) => {
    const newForm = {...updateForm};

    newForm[formKey] = formValue;

    setUpdateForm(newForm);
  }

  const updateProfile = async () => {
    setLoading(true);
    const updatedUsername = updateForm.username != userRegistered.username ? updateForm.username : "";
    const updatedSentence = updateForm.motivationalSentence != userRegistered.motivationalSentence ? updateForm.motivationalSentence : "";
    
    await updateUserProfile(userRegistered, newImage, updatedUsername, updatedSentence);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} containerStyle={styles.container}>
        <TouchableOpacity onPress={() => getImage(setNewImage)} style={{ alignItems: 'center' }}>
          <Text style={styles.editPhotoText}>Editar Foto</Text>
          {userRegistered.photo || newImage ?
            <Image
              source={{ uri: newImage ? newImage : userRegistered.photo }}
              style={styles.userPhoto}
            />
            :
            <View style={styles.userPhoto}>
              <FontAwesome name="user" color={THEME.COLORS.DARKER_GREY} size={20} />
            </View>
          }
        </TouchableOpacity>

        <TextInput
          placeholder="Nome de Usuário..."
          style={styles.input}
          value={updateForm.username}
          placeholderTextColor={THEME.COLORS.PLACEHOLDER}
          onChangeText={(text) => setFormValue("username", text.toLocaleLowerCase())}
          autoCapitalize="none"
          secureTextEntry={true}
          keyboardType={"visible-password"}
        />

        <TextInput
          placeholder="Frase Motivacional..."
          value={updateForm.motivationalSentence}
          placeholderTextColor={THEME.COLORS.LIGHT_BLACK}
          onChangeText={(text) => setFormValue("motivationalSentence", text)}
          style={styles.input}
        />

        <Image
          source={adjustChess}
          defaultSource={adjustChess}
          style={styles.updateImage}
        />

      </TouchableWithoutFeedback>
      <Button onPress={updateProfile} isLoading={loading} text='Atualizar' specificStyle={styles.updateButton} redButton={true} />
    </View>
  );
}