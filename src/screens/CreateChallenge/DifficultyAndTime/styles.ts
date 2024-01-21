import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingTop: '10%'
  },

  pageTitleCont: {
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
    color: THEME.COLORS.PRIMARY_RED,
    marginTop: 6
  },

  formCont: {
    marginTop: 32
  },

  formItemLabel: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
  },

  input: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    lineHeight: THEME.FONT_SIZE.SM,
    width: THEME.SIZES.SCREEN_WIDTH * 0.5,
    minHeight: 45,
    paddingHorizontal: THEME.FONT_SIZE.MD,
    backgroundColor: THEME.COLORS.SECONDARY_RED,
    borderRadius: 5,
    marginTop: 8,
    padding: 4,
    marginBottom: 24
  },

  difficultyButtonContainer: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24
  },

  difficultyButton: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: THEME.COLORS.WHITE_OPAQUE,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },

  selectedDifficulty: {
    backgroundColor: THEME.COLORS.PRIMARY_RED
  },

  challengeSummaryCont: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: THEME.COLORS.PRIMARY_RED,
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginTop: 16
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

  amountOfDays: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: 28,
    textAlign: 'center',
    color: THEME.COLORS.WHITE_TEXT
  },

  daysLabel: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: 16,
    textAlign: 'center',
    color: THEME.COLORS.WHITE_TEXT
  },

  buttonContainer: {
    marginBottom: 32,
    marginTop: 16,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center'
  }
});