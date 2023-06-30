import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: THEME.COLORS.PRIMARY_RED,
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    justifyContent: 'space-between'
  },

  challengeInfo: {
    flexDirection: 'column',
    maxWidth: '60%',
    alignItems: 'flex-start'
  },

  challengeTitle: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE_TEXT,
    marginBottom: 8,
    textAlign: 'center'
  },

  challengeDesc: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.GREY_TEXT
  },

  challengePercentage: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: 30,
    color: THEME.COLORS.WHITE_TEXT
  },

  notEnrolledCont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});