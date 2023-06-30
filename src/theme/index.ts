import { Dimensions } from "react-native";

export const THEME = {
  COLORS: {
    PRIMARY_RED: '#E73626',
    SECONDARY_RED: '#FDEFEE',
    THIRD_RED: '#8D2319',

    WHITE_TEXT: '#FFFFFF',
    BLACK_TEXT: '#000000',
    GREY_TEXT: '#E0E0E0',

    PLACEHOLDER: '#455A64',

    DARKER_GREY: '#D6D5D5'
  },

  FONT_FAMILY: {
    REGULAR: 'Recursive_400Regular',
    MEDIUM: 'Recursive_500Medium',
    SEMI_BOLD: 'Recursive_600SemiBold',
    BOLD: 'Recursive_700Bold',
  },

  FONT_SIZE: {
    SM: 14,
    MD: 16,
    ML: 18,
    LG: 24,
    XL: 40
  },

  SIZES: {
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height
  }
}