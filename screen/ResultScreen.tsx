import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';

type Navigation = NavigationProp<HomeStackList>;

type Result = {
  id: string;
  ans: 'yes' | 'no' | null;
};

const results = [
  {
    id: 'r1',
    text: 'ビール',
    image: require("../assets/images/beer.png"),
    info: '飲み会の定番　苦めで弱炭酸　のどごしを楽しむお酒',
    options: {
      yes: null, //終了
      no: 'r2'
    }
  },
  {
    id: 'r2',
    text: 'グレープフルーツサワー',
    image: require("../assets/images/grapefruit.png"),
    info: 'グレープフルーツ＋ウォッカ＋炭酸　甘味控えめで食事に合う　ペースアップに注意',
    options: {
      yes: null, //終了
      no: 'r3'
    }
  },
  {
    id: 'r3',
    text: '焼酎',
    image: require("../assets/images/syoutyu.png"),
    info: '蒸留酒　ロックやソーダ割りで注文できる　度数は高め',
    options: {
      yes: null, // 終了
      no: 'r1'
    }
  },
  // {
  //   id: 'r4',
  //   text: '気分が変わった？もう一度アンケートしてこよう',
  //   image: require("../assets/images/sweet.png"),
  //   options: {
  //     yes: null,
  //     no: 'r1'
  //   }
  // },
];

const initialResults : Result[] = results.map((result: any) => ({
  id:result.id,
  ans: null
}));

export default function ResultScreen() {
  const navigation = useNavigation<Navigation>();
  const [currentResultId, setCurrentResultId] = useState('r1');
  const [answers, setAnswers] = useState(initialResults);

  const { width, height } = Dimensions.get('window');

  const handleAnswer = (answer: 'yes' | 'no') => {

    const getUpdateAnswers = (prevAnswers: Result[]) => {
      return prevAnswers.map(ans => {
        if (ans.id === currentResultId) {
          return { ...ans, ans: answer };
        } else {
          return ans;
        }
      });
    };

    const updatedAnswers = getUpdateAnswers(answers);
    setAnswers(updatedAnswers);

    const currentQuestion = results.find(a => a.id === currentResultId);
    const nextResultId = currentQuestion?.options[answer];

    if (nextResultId) {
      setCurrentResultId(nextResultId);
    } else {
      // アンケート終了処理
      console.log('アンケート終了');
      navigation.navigate("RouteHome");
      console.log(updatedAnswers);
    }
  };

  const currentQuestion = results.find(r => r.id === currentResultId);

  if (!currentQuestion) {
    return <Text>アンケートが見つかりません</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.paperContainer}>
        <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => navigation.navigate("RouteHome")}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Text style={styles.resultText}>あなたへのおすすめは{'\n'}{currentQuestion.text}</Text>
          <Image source={currentQuestion.image} style={styles.image} />
          <Text style={styles.infoText}>{'\n'}{currentQuestion.info}</Text>
        </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonDark} 
          onPress={() => handleAnswer('yes')}>
          <Text style={styles.buttonText}>これや！</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonLight} 
          onPress={() => handleAnswer('no')}>
          <Text style={styles.buttonText}>別のお酒</Text>
        </TouchableOpacity>
        </View>
        </View>
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
    height: '100%',
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '5%',
  },
  image: {
    flex: 0,
    height: 280,
    width: 280,
    resizeMode: 'contain',
  },
  resultText: {
    fontSize: 28,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    width: '70%',
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
