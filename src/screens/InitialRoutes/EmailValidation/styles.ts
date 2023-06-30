import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.COLORS.PRIMARY_RED,
    paddingTop: '20%'
  },

  onboardingTitleCont: {
    alignItems: 'center'
  },

  normalText: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    lineHeight: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.WHITE_TEXT,
    width: THEME.SIZES.SCREEN_WIDTH * 0.77,
    textAlign: 'center'
  },

  bigText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    lineHeight: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.WHITE_TEXT,
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    textAlign: 'center',
    marginBottom: 8
  },

  imageCont: {
    alignItems: 'center'
  },

  onboardingImage: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    aspectRatio: 3.1/3,
    marginBottom: 24
  },

  footer: {
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    paddingBottom: 40
  },

  dontHaveAccountLink: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    lineHeight: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE_TEXT,
    marginTop: 8
  }
});