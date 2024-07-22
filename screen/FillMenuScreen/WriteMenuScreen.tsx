import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import Checkbox from '@/components/CheckBox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { updateMenuItemsId } from '../HomeScreen';

import { getAlchol } from '@/database/todo';

type Navigation = NavigationProp<HomeStackList>;

//ここを追加・編集
const idOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

//表示列数
const colum = 2;

export default function WriteMenuScreen() {
  const navigation = useNavigation<Navigation>();

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(new Array(idOptions.length).fill(false));

  //idOptionsから名前を取得
  const getNamefromIdList = (idList: number[]) => {
    let nameList = [];
    for (let id of idList){
      let data = getAlchol(id)
      nameList.push(data.name)
    }
    return nameList
  }

  //チェックボックスのボタンを押したとき
  const handleValueChange = (index: number) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  //Returnが押されたとき
  const handleReturn = () => {
    const selectedItems = idOptions //全てのキーを取得
      .filter((_, index) => checkboxStates[index]); //値がtrueであるキーのみを取得

    updateMenuItemsId(selectedItems);
      
    console.log("Selected Items: ", selectedItems);
    navigation.navigate('RouteHome')
  }

  const nameList = getNamefromIdList(idOptions);

  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data = {nameList}
          renderItem={({item,index}) =>
            <Checkbox
              label={item}
              value={checkboxStates[index]}
              onValueChange={() => {console.log("click check box"); handleValueChange(index)}}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          numColumns={colum} // 2列に設定
          contentContainerStyle={styles.listContainer}
        /> 
      </SafeAreaView>
      <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleReturn}
        >
          <Entypo name="home" size={35} color= '#ffefe2'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#3d2c25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 170, 
    height: 50,
    backgroundColor: '#8c522c',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
  },
  font: {
    color: 'black', 
    fontSize: 30,
    letterSpacing: 5,
    padding: 1
  }
});