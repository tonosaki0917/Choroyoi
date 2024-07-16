import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import NewMenu from '@/components/NewMenu';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { ProgressBar } from 'react-native-paper';

type Navigation = NavigationProp<HomeStackList>;

// 今は使ってない
let newMenuItems = "キウイサワー/ワイン/カシオレ/コーラハイボール/ジンジャーハイボール/日本酒/ジンソーダ/ウーロンハイ/"; // 変数menuItemsを設定、/（スラッシュ）で改行

// 表示させるメニューの変更（更新は行われない）
// データベースを設定したら、そこから取り出す方がよいと思われる
// 今は使ってない
export function updateMenuItems(newItems: string) {
  newMenuItems = newItems;
}

// idで管理
let newMenuItemsId = [0, 1, 2, 3, 4];
// idリストの更新 <= WriteMenuScreen.tsx
export function updateMenuItemsId(newIdList: number[]) {
  newMenuItemsId = newIdList;
}

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const [menuItems, setMenuItems] = useState(newMenuItems);
  const [menuItemsId, setMenuItemsId] = useState(newMenuItemsId);


  // 酒量の上限（固定値）
  const drinkLimit = 5; // 例として5に設定
  // すでに頼んだお酒の量
  const [drinksOrdered, setDrinksOrdered] = useState(2); // 例として2に設定

  // 画面がフォーカスされたときに実行される
  useFocusEffect(
    useCallback(() => {
      setMenuItemsId(newMenuItemsId);
    }, [])
  )

  // 進行状況を計算
  const progress = drinksOrdered / drinkLimit;
  console.log(`Progress: ${progress}, Drinks Ordered: ${drinksOrdered}, Drink Limit: ${drinkLimit}`);

  // Resultボタンが押されたときに呼ばれる関数
  const handleResultButtonPress = () => {
    setDrinksOrdered(prev => prev + 1);
    navigation.navigate('Result');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <View style = {styles.allContainer}>
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={progress} color="green" visible={true} style={styles.progressBar} />
        </View>
        <View style={styles.menuContainerL}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              お品がき
            </Text>
            <View style={styles.menuButton}>
              <TouchableOpacity 
                style={styles.buttonDark}
                onPress={() => navigation.navigate('WriteMenu')}
              >
                <Entypo name="edit" size={24} color='#ffefe2'/>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonLight}
                onPress={() => navigation.navigate('TakePhoto')}
              >
                <Entypo name="camera" size={24} color='#ffefe2'/>
              </TouchableOpacity>
            </View>
          </View>
          <NewMenu
            menuItems={menuItemsId}
            radius={8}
            justifyContent='center'
            alignItems='center'
          />
          <View style={styles.buttonRow}>
            <View style={styles.buttonColumn}>
              <TouchableOpacity 
                style={styles.buttonQuestion}
                onPress={() => navigation.navigate('QuestionSheet')}
              >
                <Image 
                  source={require("../assets/images/checkboard.png")}
                  style={styles.imageStyle}
                />
                <Text style={styles.font}>
                  Question
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.buttonProfile}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.font}>
                  Profile
                </Text>
                <Feather name="user" size={30} color='#ffefe2'/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={styles.buttonResult}
              onPress={handleResultButtonPress}
            >
              <Image 
                source={require("../assets/images/bell.png")}
                style={styles.bellimage}
              />
              <Text style={styles.font}>
                Result
              </Text>
            </TouchableOpacity>
          </View>
          </View>
              <TouchableOpacity 
                    style={styles.buttonEnd}
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Text style={styles.font}>
                      Profile
                    </Text>
                    <Feather name="user" size={30} color='#ffefe2'/>
                  </TouchableOpacity>
            </View>
      </View>
      </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#3d2c25',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  menuContainerL: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  allContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#ffefe2', 
    fontSize: 30,
    padding: 1
  },
  imageStyle: {
    flex: 0,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  bellimage: {
    flex: 0,
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  menuButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
    borderRadius: 90,
  },
  buttonDark: {
    backgroundColor: '#8c522c',
    width: 50,
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLight: {
    backgroundColor: '#996d48',
    width: 50,
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonQuestion: {
    backgroundColor: '#8c522c',
    width: '100%',
    height: 125,
    padding: 5,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonProfile: {
    backgroundColor: '#996d48',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    padding: 5,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonResult: {
    backgroundColor: '#bb7334',
    width: '50%',
    height: 185,
    padding: 5,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonEnd: {
    flex: 1,
    backgroundColor: '#996d48',
    flexDirection: 'column',
    width: 500,
    height: 500,
    padding: 5,
    marginTop: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressBar: {
    height: 10,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    borderColor: 'black',
    borderWidth: 3,
    width: 50,
    height: 50, 
    borderRadius: 90,
    backgroundColor: '#753e06',
    padding: 0,
    alignItems: 'center',
  },
  font: {
    color: '#ffefe2', 
    fontSize: 25,
    padding: 1
  }
});