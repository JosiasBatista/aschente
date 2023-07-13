import { useContext, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, Image, Text, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';
import { Button } from '../Button';
import { useSignOut } from '../../hook/useSignOut';
import { DeleteConfirmation } from '../DeleteConfirmation';

export function Header() {
  const { userRegistered, logout, unregister } = useContext(UserContext);
  const [{}, handleSignOut] = useSignOut();
  const navigation = useNavigation();
  const [deleteConfirmModalStatus, setDeleteConfirmModalStatus] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={{ paddingRight: 16 }}>
            <FontAwesome name="bars" size={25} color={THEME.COLORS.PRIMARY_RED} />
          </TouchableOpacity>
        )
      }
    })
  }, [navigation])

  const handleUserLogout = async () => {
    if (typeof unregister == "function") await unregister();
    logout();
    handleSignOut();
  }

  return (
    isMenuOpen ?
      <Modal transparent={true} animationType="fade">
        <TouchableOpacity style={styles.menuContainer} onPress={() => setIsMenuOpen(false)}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.menu}>
              <TouchableOpacity style={styles.closeModalButton} onPress={() => setIsMenuOpen(false)}>
                <FontAwesome name="times-circle" size={20} />
              </TouchableOpacity>

              <View style={styles.userInfos}>
                {userRegistered.photo ?
                  <Image source={{ uri: userRegistered.photo }} style={styles.userPhoto} />
                  :
                  <View style={styles.userPhoto}>
                    <FontAwesome name="user" color={THEME.COLORS.DARKER_GREY} size={20} />
                  </View>
                }

                <View>
                  <Text style={styles.userName}>{userRegistered?.username}</Text>
                  <TouchableOpacity onPress={() => { setIsMenuOpen(false); navigation.navigate("userProfile") }}>
                    <Text style={styles.showProfile}>Ver perfil</Text>
                  </TouchableOpacity>
                </View>

              </View>

              <Text style={styles.motivationSentence}>
                {userRegistered.motivationalSentence}
              </Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleUserLogout}>
                  <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDeleteConfirmModalStatus(true)}>
                  <Text style={styles.deleteAccountButton}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>

        {/* {deleteConfirmModalStatus && */}
          <DeleteConfirmation
            isOpen={deleteConfirmModalStatus}
            closeModal={() => setDeleteConfirmModalStatus(false)}
          />
        {/* } */}
      </Modal>
      :
      <></>
  );
}