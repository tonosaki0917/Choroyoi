import React from 'react';
import { CheckBox } from 'react-native-elements';

type CheckboxProps = {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange }) => {
  return (
    <CheckBox
      title={label}
      checked={value}
      onPress={() => onValueChange(!value)}
    />
  );
};

export default Checkbox;