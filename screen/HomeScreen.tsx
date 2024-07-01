import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import Menu from '@/components/Menu';
import VerticalText from '../components/VerticalText';

import { useState, useEffect, useCallback } from 'react';

type Navigation = NavigationProp<HomeStackList>;

let newMenuItems = "ビール/焼酎/梅酒/レモンサワー/グレープフルーツサワー/カルピスサワー/トマトサワー/キウイサワー/ワイン/カシオレ/コーラハイボール/ジンジャーハイボール/日本酒/ジンソーダ/ウーロンハイ/"; //変数menuItemsを設定、/（スラッシュ）で改行

//表示させるメニューの変更（更新は行われない）
//データベースを設定したら、そこから取り出す方がよいと思われる
export function updateMenuItems(newItems: string){
  newMenuItems = newItems;
}

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');
  const [menuItems, setMenuItems] = useState(newMenuItems);

  //画面がフォーカスされたときに実行される
  useFocusEffect(
    useCallback(() =>{
      if (newMenuItems.length == 0) {
        setMenuItems("設定されていません");
      }
      else{
        setMenuItems(newMenuItems);
      }
    }, [])
  )


  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
      <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('WriteMenu')}
                >
                <Text style={styles.font}>
                  W
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('TakePhoto')}
              >
                <Text style={styles.font}>
                  T
                </Text>
              </TouchableOpacity>
        </View>
      <View style={styles.menu}>
        <Menu
                menuItems={menuItems}
                radius={8}
                justifyContent='center'
                alignItems='center'
              >
              </Menu>
        </View>
        
        </View>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.font}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Question')}
        >
          <Text style={styles.font}>
            Question
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Result')}
        >
          <Text style={styles.font}>
            Result
          </Text>
        </TouchableOpacity>
        
        
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A15D44',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 10, // 左右の余白を追加
  },
  menu: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end', // 要素を右揃え
    resizeMode: 'contain', 
    flexDirection: 'column',
    justifyContent: 'flex-end', 
    zIndex: 999,
    marginBottom: '5%',
  },
  button: {
    borderColor: 'black',
    borderWidth: 3,
    width: 50,
    height: 50, 
    borderRadius: 90,
    backgroundColor: '#F7DEC4',
    padding: 0,
    alignItems: 'center',
  },
  font: {
    color: 'black', 
    fontSize: 25,
    letterSpacing: 5,
    padding: 1
  }
});