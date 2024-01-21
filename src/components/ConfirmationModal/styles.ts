import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  modalContainer: {
    width: THEME.SIZES.SCREEN_WIDTH,
    height: THEME.SIZES.SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.6)',
    zIndex: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modal: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    backgroundColor: THEME.COLORS.WHITE_TEXT,
    alignItems: 'center',
    padding: 24
  },

  closeModalButton: {
    alignSelf: 'flex-end',
    marginBottom: 16
  },

  leavingImage: {
    zIndex: 20,
    width: THEME.SIZES.SCREEN_WIDTH * 0.8,
    aspectRatio: 1
  },

  confirmationTitle: {
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.ML,
    color: THEME.COLORS.PRIMARY_RED,
    marginTop: 16
  },

  confirmationDesc: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.SM,
    color: THEME.COLORS.PLACEHOLDER,
    marginTop: 4,
    textAlign: 'center'
  },

  buttonsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8
  },

  buttonStyle: {
    width: THEME.SIZES.SCREEN_WIDTH * 0.3
  }
});