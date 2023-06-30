import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingHorizontal: 16,
    width: THEME.SIZES.SCREEN_WIDTH
  },

  pageTitle: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.PRIMARY_RED
  },

  currentDayText: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.PLACEHOLDER
  },

  activitiesContainer: {
    marginTop: 40
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 60,
    backgroundColor: '#FFF',
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  }
});