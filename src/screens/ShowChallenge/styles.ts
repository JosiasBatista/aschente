import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingHorizontal: 16
  },

  challengeHeader: {
    width: THEME.SIZES.SCREEN_WIDTH,
    paddingHorizontal: 16,
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingBottom: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    zIndex: 10
  },

  challengeMainInfos: { 
    alignItems: 'flex-start',
    width: THEME.SIZES.SCREEN_WIDTH * 0.9
  },

  challengeName: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.PRIMARY_RED
  },

  challengeDesc: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.PLACEHOLDER
  },

  challengeStatusContainer: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    height: 130,
    borderRadius: 20,
    position: 'relative',
    padding: 24,
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    borderColor: THEME.COLORS.PRIMARY_RED,
    borderWidth: 1,
    marginTop: 24,
    justifyContent: 'center'
  },

  waveStyle: {
    position: 'absolute',
    // borderTopLeftRadius: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width: 130,
    // top: 0,
    // left: THEME.SIZES.SCREEN_WIDTH * 0.1,
    right: THEME.SIZES.SCREEN_WIDTH * 0.225,
    height: THEME.SIZES.SCREEN_WIDTH,
    aspectRatio: 1,
    overflow: 'hidden',
    transform: [
      { rotate: "90deg" }
    ],
    // backgroundColor: '#000'
    // flexDirection: 'column-reverse'
  },

  progressBar: {
    position: 'absolute',
    height: 130,
    top: 0,
    left: 0,
    backgroundColor: THEME.COLORS.PRIMARY_RED,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18
  },

  percentageNum: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.BLACK_TEXT
  },

  percentageText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.BLACK_TEXT
  },

  notEnrolled: {
    marginTop: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  notEnrolledText: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.PRIMARY_RED,
    textAlign: 'center'
  },

  currentChallengeDay: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.BLACK_TEXT,
    maxWidth: '50%'
  },

  challengeIcon: {
    position: 'absolute',
    bottom: -3,
    right: -50,
    zIndex: 0
  },

  listContainer: {
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center'
  },

  challengeDayCont: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    height: 120,
    borderRadius: 20,
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginVertical: 8,
    backgroundColor: '#000',
    elevation: 4,
    shadowColor: '#000',
    borderBottomColor: THEME.COLORS.WHITE_TEXT
  },

  completedDay: {
    backgroundColor: THEME.COLORS.GREY_TEXT
  },

  futureDay: {
    backgroundColor: THEME.COLORS.WHITE_TEXT
  },

  whiteText: {
    color: THEME.COLORS.WHITE_TEXT
  },

  remainingActivities: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.GREY_TEXT,
  },

  
});