import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingHorizontal: 16
  },

  greetingCont: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    width: THEME.SIZES.SCREEN_WIDTH,
    marginBottom: 16
  },

  greetingsTitle: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.BLACK_TEXT
  },

  greetingUsername: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.PRIMARY_RED
  },

  greetingsMessage: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.PLACEHOLDER
  },

  addChallengeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY_RED
  }
});