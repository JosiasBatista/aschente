import { useContext, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, Image, Text, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';
import { Button } from '../Button';

export function Header() {
  const { userRegistered } = useContext(UserContext);
  const navigation = useNavigation();
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
                  <Image source={{ uri: userRegistered.photo }} />
                  :
                  <View style={styles.userPhoto}>
                    <FontAwesome name="user" color={THEME.COLORS.DARKER_GREY} size={20} />
                  </View>
                }

                <View>
                  <Text style={styles.userName}>{userRegistered.username}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate("userProfile")}>
                    <Text style={styles.showProfile}>Ver perfil</Text>
                  </TouchableOpacity>
                </View>

              </View>

              <Text style={styles.motivationSentence}>
                {userRegistered.motivationalSentence}
              </Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.logoutButton}>
                  <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.deleteAccountButton}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      :
      <></>
  );
}