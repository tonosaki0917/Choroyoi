import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';

type Navigation = NavigationProp<HomeStackList>;

const questions = [
  {
    id: 'q1',
    text: '最初の質問です。続けますか？',
    image: require("../assets/images/Login.jpg"),
    options: {
      yes: 'q2',
      no: 'q3'
    }
  },
  {
    id: 'q2',
    text: '二つ目の質問です。次に進みますか？',
    image: require("../assets/images/icon.png"),
    options: {
      yes: 'q3',
      no: 'q4'
    }
  },
  {
    id: 'q3',
    text: 'ここでアンケートを終了しますか？',
    image: require("../assets/images/Login.jpg"),
    options: {
      yes: null, // 終了
      no: 'q1'
    }
  },
  {
    id: 'q4',
    text: '本当の二つ目の質問です。次に進みますか？',
    image: require("../assets/images/Login.jpg"),
    options: {
      yes: 'q3',
      no: 'q1'
    }
  },
];

export default function QuestionSheetScreen() {
  const navigation = useNavigation<Navigation>();
  const [currentQuestionId, setCurrentQuestionId] = useState('q1');

  const { width, height } = Dimensions.get('window');

  const handleAnswer = (answer: 'yes' | 'no') => {
    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const nextQuestionId = currentQuestion?.options[answer];
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    } else {
      // アンケート終了処理
      console.log('アンケート終了');
      navigation.navigate("RouteHome");
    }
  };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  if (!currentQuestion) {
    return <Text>アンケートが見つかりません</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={currentQuestion.image} style={{width: width/2, height: height/4, position: 'absolute'}} />
      <Text style={styles.questionText}>{currentQuestion.text}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleAnswer('yes')}>
          <Text style={styles.buttonText}>はい</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleAnswer('no')}>
          <Text style={styles.buttonText}>いいえ</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => navigation.navigate("Question")}>
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 24,
    marginBottom: 400,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: '#101010',
    top: 50,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
});