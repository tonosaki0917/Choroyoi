import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;  
  fontSize: number;
}

const VerticalText: React.FC<Props> = ({ text, fontSize }) => {
  const lines = text.split('/'); // "/"でテキストを分割
  
  return (
    <View style={styles.horizontalTextContainer}>
      {lines.map((line: string, lineIndex: number) => (
        <View key={lineIndex} style={styles.verticalTextContainer}>
          {line.split('').map((char: string, charIndex: number) => {
            // "ー"を縦の伸ばし棒に置き換える
            const displayChar = char === 'ー' ? '｜' : char;
            return (
              <Text key={charIndex} style={[styles.verticalText, { fontSize }]}>
                {displayChar}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 5, // 横方向の余白を追加
  },
  verticalText: {
    color: '#22110E',
    textAlign: 'center',
  },
});

export default VerticalText;
