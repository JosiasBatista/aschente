import React, { useContext, useState } from 'react';
import { View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import { styles } from './styles';
import leaving from '../../assets/leaving.png';
import { Button } from '../Button';
import UserContext from '../../context/UserContext';
import { deleteFirebaseUser } from '../../service/user';
import Toast from 'react-native-root-toast';

interface DeleteConfirmationProps {
  closeModal: () => void,
  isOpen: boolean,
}

export function DeleteConfirmation({ closeModal, isOpen }: DeleteConfirmationProps) {
  const { removeUser } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAccount = async () => {
    setLoading(true);

    const isRemoved = await removeUser();
  
    if (isRemoved) {
      deleteFirebaseUser()?.then(() => {
        Toast.show("Usuário deletado!")
      }).catch((error) => {
        console.log(error)
        Toast.show("Houve um erro ao deletar sua conta!")
      });
    } else {
      Toast.show("Houve um erro ao deletar sua conta!")
    }
  }

  return (
    <Modal transparent={true} animationType="fade" visible={isOpen} >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
            <FontAwesome name="times-circle" size={20} />
          </TouchableOpacity>

          <Image      
            source={leaving}
            defaultSource={leaving}
            style={styles.leavingImage}
          />

          <Text style={styles.confirmationTitle}>Você está indo embora?</Text>
          <Text style={styles.confirmationDesc}>Tem certeza que deseja excluir todos os seus dados e não quer continuar com os desafios?</Text>
        
          <View style={styles.buttonsContainer}>
            <Button text="Não" redButton={true} specificStyle={styles.buttonStyle} onPress={closeModal} />
            <Button text="Sim" specificStyle={styles.buttonStyle} onPress={deleteAccount} isLoading={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
}