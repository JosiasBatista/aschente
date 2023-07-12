import { useContext } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import UserContext from '../../context/UserContext';
import { ProfileComponent } from '../../components/ProfileComponent';

export function Profile() {
  const { userRegistered } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <ProfileComponent 
        user={userRegistered}
      />
    </View>
  );
}