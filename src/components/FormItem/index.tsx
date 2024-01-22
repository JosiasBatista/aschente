import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { styles } from './styles';
import { ChallengeCreationProps } from '../../screens/CreateChallenge/MainInfos';
import { THEME } from '../../theme';

type ChallengeTypes = keyof ChallengeCreationProps

interface FormItemProps {
  label: string,
  placeholder: string,
  valueName: ChallengeTypes,
  setValue: (fieldName: ChallengeTypes, value: string | boolean) => void,
  numberOfLines?: number,
  defaultValue?: string
}

export function FormItem({label, placeholder, valueName, setValue, numberOfLines = 1, defaultValue}: FormItemProps) {
  return (
    <View style={styles.formItemCont}>
      <Text style={styles.formItemLabel}>{label}</Text>
  
      <TextInput
        placeholder={placeholder}
        multiline={numberOfLines > 1}
        style={[styles.input, numberOfLines > 1 ? {textAlignVertical: 'top'} : null]}
        placeholderTextColor={THEME.COLORS.PLACEHOLDER}
        defaultValue={defaultValue}
        onChangeText={(text) => setValue(valueName as ChallengeTypes, text)}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}