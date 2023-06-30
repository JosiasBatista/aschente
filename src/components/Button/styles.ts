import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.5,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT
  },

  redButton: {
    backgroundColor: THEME.COLORS.PRIMARY_RED
  },

  buttonText: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.BLACK_TEXT
  },

  redButtonText: {
    color: THEME.COLORS.WHITE_TEXT
  }
});