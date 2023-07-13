import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

interface Props extends TouchableOpacityProps {
  text: string,
  specificStyle?: any,
  isLoading?: boolean, 
  redButton?: boolean
}

export function Button({ text, onPress, isLoading = false, redButton = false, specificStyle, ...rest }: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={isLoading}
      style={[styles.button, redButton ? styles.redButton : null, specificStyle]} 
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