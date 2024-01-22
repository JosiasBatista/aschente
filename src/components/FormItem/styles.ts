import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  formItemCont: {
    marginBottom: 16
  },

  formItemLabel: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD
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
});