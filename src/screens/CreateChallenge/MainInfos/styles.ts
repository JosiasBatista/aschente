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

  formContent: {
  },

  switchContainer: {
    justifyContent: 'space-between',
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 32
  },

  formItemCont: {
    marginBottom: 16
  },

  formItemLabel: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
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

  creationButtonCont: {
    marginTop: 40,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    alignItems: 'center'
  }
});