import React from 'react';
import { View, Modal, Image, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import { styles } from './styles';
import adjustchess from '../../assets/adjustchess.png';
import { Button } from '../Button';

interface DeleteConfirmationProps {
  closeModal: () => void,
  executeAction: () => void,
  isOpen: boolean,
  messages: {
    title: string,
    description?: string
  },
  loading: boolean
}

export function ConfirmationModal({ closeModal, isOpen, executeAction, messages, loading }: DeleteConfirmationProps) {

  return (
    <Modal transparent={true} animationType="fade" visible={isOpen} >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
            <FontAwesome name="times-circle" size={20} />
          </TouchableOpacity>

          <Image      
            source={adjustchess}
            defaultSource={adjustchess}
            style={styles.leavingImage}
          />

          <Text style={styles.confirmationTitle}>{messages.title}</Text>
          <Text style={styles.confirmationDesc}>{messages.description}</Text>
        
          <View style={styles.buttonsContainer}>
            <Button text="Não" redButton={true} specificStyle={styles.buttonStyle} onPress={closeModal} />
            <Button text="Sim" specificStyle={styles.buttonStyle} onPress={executeAction} isLoading={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
}