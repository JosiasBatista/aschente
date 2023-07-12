import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    paddingHorizontal: 8
  },

  userWithoutPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center'
  },

  userInfoCont: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 8
  },

  userName: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.PRIMARY_RED
  },
  
  userEmail: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.PLACEHOLDER
  },

  counterContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    gap: 24,
    marginTop: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  countItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8
  },

  challengesCont: {
    // width: THEME.SIZES.SCREEN_WIDTH * 0.95,
    marginTop: 24,
    paddingBottom: 32,
    padding: 8,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
    gap: 8
  },

  challengeItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    gap: 12,
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    alignItems: 'center'
  },

  challengeTitle: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.PLACEHOLDER
  },

  challengeDate: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.LIGHT_BLACK
  }
});