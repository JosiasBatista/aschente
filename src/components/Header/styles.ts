import { StatusBar, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  menuContainer: {
    width: THEME.SIZES.SCREEN_WIDTH,
    height: THEME.SIZES.SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.6)',
    zIndex: 10,
    alignItems: 'flex-end'
  },

  menu: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.75,
    height: THEME.SIZES.SCREEN_HEIGHT,
    backgroundColor: '#FFF',
    padding: 16,
    position: 'relative',
    zIndex: 20
  },

  closeModalButton: {
    alignSelf: 'flex-end'
  },

  userInfos: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },

  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center'
  },

  userName: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.BLACK_TEXT
  },

  showProfile: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.PRIMARY_RED
  },

  motivationSentence: {
    marginTop: 40,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.XL,
    color: THEME.COLORS.PRIMARY_RED,
    textAlign: 'center'
  },

  buttonsContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: THEME.SIZES.SCREEN_WIDTH * 0.75,
    bottom: 20,
  },

  logoutButton: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: THEME.COLORS.PRIMARY_RED
  },

  logoutButtonText: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.WHITE_TEXT
  },

  deleteAccountButton: {
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.PRIMARY_RED,
    padding: 8
  }
});