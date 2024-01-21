import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end'
  },

  optionsCont: {
    alignItems: 'flex-end',
    marginBottom: 8
  },

  option: {
    color: THEME.COLORS.PRIMARY_RED,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    padding: 4
  },

  selectOptionsButton: {
    width: 45,
    height: 45,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY_RED
  }
});