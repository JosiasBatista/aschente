import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends TouchableOpacityProps {
  text: string,
  isLoading?: boolean, 
  redButton?: boolean
}

export function Button({ text, onPress, isLoading = false, redButton = false, ...rest }: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, redButton ? styles.redButton : null]} 
      {...rest}
    >
      {isLoading ?
        <ActivityIndicator size="small" color={redButton ? THEME.COLORS.WHITE_TEXT : THEME.COLORS.PRIMARY_RED} />
        :
        <Text 
          style={[styles.buttonText, redButton ? styles.redButtonText : null]}
        >
          {text}
        </Text>
      }
    </TouchableOpacity>
  );
}