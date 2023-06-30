import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 61,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center'
  }
});