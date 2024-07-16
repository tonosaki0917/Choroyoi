import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';


type Navigation = NavigationProp<HomeStackList>;

type Answer = {
  id: string;
  ans: 'yes' | 'no' | null;
};

const questions = [
  {
    id: 'q1',
    text: '炭酸の気分ですか？',
    image: require("../assets/images/beer.png"),
    options: {
      yes: 'q2',
      no: 'q3'
    }
  },
  {
    id: 'q2',
    text: 'フルーツの気分ですか？',
    image: require("../assets/images/fruits.png"),
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
    text: '甘いお酒がいいですか？',
    image: require("../assets/images/sweet.png"),
    options: {
      yes: 'q3',
      no: 'q1'
    }
  },
];

const initialAnswers : Answer[] = questions.map((question: any) => ({
  id:question.id,
  ans: null
}))
//[{id:'q1', ans:null}]

export default function QuestionSheetScreen() {
  const navigation = useNavigation<Navigation>();
  const [currentQuestionId, setCurrentQuestionId] = useState('q1');
  const [answers, setAnswers] = useState(initialAnswers);

  const { width, height } = Dimensions.get('window');

  const handleAnswer = (answer: 'yes' | 'no') => {

    const getUpdateAnswers = (prevAnswers: Answer[]) => {
      return prevAnswers.map(ans => {
        if (ans.id === currentQuestionId) {
          return { ...ans, ans: answer };
        } else {
          return ans;
        }
      });
    };

    const updatedAnswers = getUpdateAnswers(answers);
    setAnswers(updatedAnswers);

    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const nextQuestionId = currentQuestion?.options[answer];

    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    } else {
      // アンケート終了処理
      console.log('アンケート終了');
      navigation.navigate("RouteHome");
      console.log(updatedAnswers);
    }
  };

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  if (!currentQuestion) {
    return <Text>アンケートが見つかりません</Text>;
  }
  // 進行状況を計算
  const questionIndex = questions.findIndex(q => q.id === currentQuestionId);
  const progress = (questionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <View style={styles.paperContainer}>
        <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.navigate("RouteHome")}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <Image source={currentQuestion.image} style={styles.image} />
        </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonDark} 
          onPress={() => handleAnswer('yes')}>
          <Text style={styles.buttonText}>はい</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonLight} 
          onPress={() => handleAnswer('no')}>
          <Text style={styles.buttonText}>いいえ</Text>
        </TouchableOpacity>
        </View>
        <ProgressBar progress={progress} color="#7c3e01" style={styles.progressBar} />
        </View>
        <></>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d2c25',
  },
  paperContainer: {
    flex: 0,
    backgroundColor: '#f2e2d2',
    width: '100%',
    height: '90%',
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  image: {
    flex: 0,
    height: 280,
    width: 280,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 28,
    textAlign: 'center',
  },
  progressBar: {
    height: 10,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#8c522c',
    width: 150,
    height: 65,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLight: {
    backgroundColor: '#996d48',
    width: 150,
    height: 65,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ffefe2',
    fontSize: 25,
  },
  closeButton: {
    position: 'absolute',
    backgroundColor: '#753e06',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    top: '3%',
    right: '4%',
    padding: 10,
    borderRadius: 90,
  },
});