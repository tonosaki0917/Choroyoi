import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import Menu from '@/components/Menu';
import VerticalText from '../components/VerticalText';

import { useState, useEffect, useCallback } from 'react';

type Navigation = NavigationProp<HomeStackList>;

let newMenuItems = "ビール/焼酎/梅酒/サワー"; //変数menuItemsを設定、/（スラッシュ）で改行

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
      setMenuItems(newMenuItems);
    }, [])
  )

  return (
    <View style={styles.container}>
        <Menu
                menuItems={menuItems}
                radius={15}
                justifyContent='center'
                alignItems='center'
              >
              </Menu>
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
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('TakePhoto')}
        >
          <Text style={styles.font}>
            TakePhoto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('WriteMenu')}
        >
          <Text style={styles.font}>
            WriteMenu
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
    backgroundColor: '#F7DEC4',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 60,
  },
  overlay: {
    position: 'absolute',
    top: 205,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 170, 
    backgroundColor: 'white',
    padding: 0,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'black',
  },
  font: {
    color: 'black', 
    fontSize: 5,
    letterSpacing: 5,
    padding: 1
  }
});