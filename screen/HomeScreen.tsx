import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import NewMenu from '@/components/NewMenu';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

import { useState, useEffect, useCallback } from 'react';

type Navigation = NavigationProp<HomeStackList>;

//今は使ってない
let newMenuItems = "キウイサワー/ワイン/カシオレ/コーラハイボール/ジンジャーハイボール/日本酒/ジンソーダ/ウーロンハイ/"; //変数menuItemsを設定、/（スラッシュ）で改行

//表示させるメニューの変更（更新は行われない）
//データベースを設定したら、そこから取り出す方がよいと思われる
//今は使ってない
export function updateMenuItems(newItems: string){
  newMenuItems = newItems;
}

//idで管理
let newMenuItemsId:number[] = []
//idリストの更新 <= WriteMenuScreen.tsx
export function updateMenuItemsId(newIdList: number[]){
  newMenuItemsId = newIdList;
}

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');
  const [menuItems, setMenuItems] = useState(newMenuItems);

  //idで管理
  const [menuItemsId, setMenuItemsId] = useState(newMenuItemsId);

  //画面がフォーカスされたときに実行される
  useFocusEffect(
    useCallback(() =>{
      setMenuItemsId(newMenuItemsId);
    }, [])
  )


  return (
    <View style={styles.container}>
      <View style={styles.menuContainerL}>
      <View style={styles.titleContainer}>
      <Text style={styles.titleText}>
              <Text>お品がき </Text>
          </Text>
      <View style={styles.menuButton}>
              <TouchableOpacity 
                style={styles.buttonDark}
                onPress={() => navigation.navigate('WriteMenu')}
                >
                <Entypo name="edit" size={24} color= '#ffefe2'/>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.buttonLight}
              onPress={() => navigation.navigate('TakePhoto')}
              >
                <Entypo name="camera" size={24} color= '#ffefe2'/>
              </TouchableOpacity>
        </View>
          </View>
          <NewMenu
                menuItems={menuItemsId}
                radius={8}
                justifyContent='center'
                alignItems='center'
              >
              </NewMenu>
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn}>
              <TouchableOpacity 
              style={styles.buttonQuestion}
              onPress={() => navigation.navigate('Question')}
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
                <Feather name="user" size={30} color= '#ffefe2'/>
              </TouchableOpacity>
          </View>
        <TouchableOpacity 
        style={styles.buttonResult}
        onPress={() => navigation.navigate('Result')}
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
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d2c25',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 0,
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
    height: '55%',
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
    height: '25%',
    padding: 5,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonResult: {
    backgroundColor: '#bb7334',
    width: '50%',
    height: '85%',
    padding: 5,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center'
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