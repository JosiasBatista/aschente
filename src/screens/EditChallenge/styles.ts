import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingTop: '5%'
  },

  pageTitleCont: {
    alignItems: 'center'
  },

  normalText: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    lineHeight: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.BLACK_TEXT,
  },

  formContainer: {
    marginTop: '10%'
  },

  formItemLabel: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
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

  input: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    lineHeight: THEME.FONT_SIZE.SM,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    minHeight: 45,
    paddingHorizontal: THEME.FONT_SIZE.MD,
    backgroundColor: THEME.COLORS.SECONDARY_RED,
    borderRadius: 5,
    marginTop: 8,
    padding: 4
  },

  addActivitieButton: {
    width: 45,
    height: 45,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY_RED
  },

  challengeActivity: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    height: 35,
    marginTop: 8,
    borderRadius: 8,
    borderColor: THEME.COLORS.PRIMARY_RED,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center'
  },

  activityText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.PRIMARY_RED,
  },

  buttonContainer: {
    marginBottom: 32,
    marginTop: 16,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    justifyContent: 'center'
  }
});