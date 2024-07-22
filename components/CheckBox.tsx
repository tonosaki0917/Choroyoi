import React from 'react';
import { CheckBox } from 'react-native-elements';
import { StyleSheet } from 'react-native';

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
      containerStyle={styles.container}
      checkedColor="#ffefe2" // チェックが入った時のボックスの色を設定
      textStyle={styles.text} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#996d48',
    borderWidth: 0, // Optional: ボーダーを削除するため
  },
  text: {
    fontSize: 13,
    color: '#ffefe2', // ボタンの文字色を設定
  },
});

export default Checkbox;


