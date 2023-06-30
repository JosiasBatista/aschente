import { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import { styles } from './styles';
import { THEME } from '../../theme';
import UserContext from '../../context/UserContext';

export function Header() {
  const { userRegistered } = useContext(UserContext);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <FontAwesome name="bars" size={25} color={THEME.COLORS.PRIMARY_RED} />
      </TouchableOpacity>

      <TouchableOpacity>
        {userRegistered.photo ?
          <Image 
            source={{ uri: userRegistered.photo }} 
            style={styles.userPhoto}
          />
          :
          <View style={styles.userPhoto}>
            <FontAwesome name="user" size={18} color={THEME.COLORS.DARKER_GREY} />
          </View>
        }
      </TouchableOpacity>
    </View>
  );
}