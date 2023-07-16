import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: THEME.SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    backgroundColor: THEME.COLORS.WHITE_TEXT
  },

  editPhotoText: {
    marginBottom: 4,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  },

  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },

  input: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.BLACK_TEXT,
    width: THEME.SIZES.SCREEN_WIDTH * 0.85,
    height: 45,
    paddingHorizontal: THEME.FONT_SIZE.MD,
    backgroundColor: THEME.COLORS.SECONDARY_RED,
    borderRadius: 5,
    marginBottom: 16
  },

  updateImage: {
    width: THEME.SIZES.SCREEN_WIDTH * 1.2,
    height: THEME.SIZES.SCREEN_WIDTH * 0.5,
    aspectRatio: 1/1,
    marginTop: 40,
    alignSelf: 'center'
  },

  updateButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  }
});