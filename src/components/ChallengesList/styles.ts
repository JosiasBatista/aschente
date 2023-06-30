import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    marginTop: 32,
    flex: 1
  },

  errorCont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24
  },

  errorTitle: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.BLACK_TEXT,
    maxWidth: THEME.SIZES.SCREEN_WIDTH * 0.5,
    marginTop: 8,
    textAlign: 'center'
  },

  title: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.BLACK_TEXT,
    width: THEME.SIZES.SCREEN_WIDTH,
    paddingLeft: 24
  },

  challengesCont: {
    marginTop: 8,
    flexGrow: 1
  },

  challengeBox: {
    width: 160,
    height: 160,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    padding: 8,
    margin: 10
  },

  whiteBox: {
    backgroundColor: THEME.COLORS.GREY_TEXT
  },
  
  redBox: {
    backgroundColor: THEME.COLORS.PRIMARY_RED
  },

  blackBox: {
    backgroundColor: THEME.COLORS.BLACK_TEXT
  },

  challengeTitle: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.WHITE_TEXT
  },

  blackTitle: {
    color: THEME.COLORS.BLACK_TEXT
  },

  challengeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    transform: [
      { rotateZ: '-27.25deg' }
    ]
  }
});