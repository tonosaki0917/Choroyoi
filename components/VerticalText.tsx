import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;  
  fontSize: number;
}

const VerticalText: React.FC<Props> = ({ text, fontSize }) => {
  const lines = text.split('/'); // "/"でテキストを分割
  
  const styles = StyleSheet.create({
    horizontalTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap', // テキストの折り返し
    },
    verticalTextContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 5, // 横方向の余白を追加
    },
    verticalText: {
      color: '#22110E',
      textAlign: 'center',
      fontSize: fontSize, // 動的に受け取ったfontSizeを適用
    },
  });

  return (
    <View style={styles.horizontalTextContainer}>
      {lines.map((line: string, lineIndex: number) => (
        <View key={lineIndex} style={styles.verticalTextContainer}>
          {line.split('').map((char: string, charIndex: number) => {
            // "ー"を縦の伸ばし棒に置き換える
            const displayChar = char === 'ー' ? '｜' : char;
            return (
              <Text key={charIndex} style={styles.verticalText}>
                {displayChar}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default VerticalText;
