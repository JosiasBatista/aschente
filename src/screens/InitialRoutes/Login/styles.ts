import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingTop: '15%'
  },

  onboardingTitleCont: {
    alignItems: 'center'
  },

  normalText: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    lineHeight: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.BLACK_TEXT
  },

  bigText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    lineHeight: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.BLACK_TEXT
  },

  contentCont: {
    alignItems: 'center'
  },

  onboardingImage: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    aspectRatio: 3.1/3,
    marginBottom: 24
  },

  input: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    height: 45,
    paddingHorizontal: THEME.FONT_SIZE.MD,
    backgroundColor: THEME.COLORS.SECONDARY_RED,
    borderRadius: 5,
    marginTop: 8
  },

  footer: {
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    paddingBottom: 40
  },

  alreadyHaveAccountLink: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    lineHeight: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.BLACK_TEXT,
    marginTop: 8
  }
});