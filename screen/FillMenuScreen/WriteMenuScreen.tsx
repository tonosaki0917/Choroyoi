import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';

import Checkbox from '@/components/CheckBox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { updateMenuItems } from '../HomeScreen';

type Navigation = NavigationProp<HomeStackList>;

//ここを追加・編集
const options = ["ビール", "焼酎", "梅酒","サワー","日本酒","酒１","酒２","酒３","酒４","酒５","鮭","a","b","c","d","e","f","g"];

//表示列数
const colum = 2;

export default function WriteMenuScreen() {
  const navigation = useNavigation<Navigation>();

  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(new Array(options.length).fill(false));

  //チェックボックスのボタンを押したとき
  const handleValueChange = (index: number) => {
    const newStates = [...checkboxStates];
    newStates[index] = !newStates[index];
    setCheckboxStates(newStates);
  };

  //Returnが押されたとき
  const handleReturn = () => {
    const selectedItems = options //全てのキーを取得
      .filter((_, index) => checkboxStates[index]) //値がtrueであるキーのみを取得
      .join("/")

    updateMenuItems(selectedItems);
      
    console.log("Selected Items: ", selectedItems);
    navigation.navigate('Home')
  }

  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data = {options}
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
      <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleReturn}
        >
          <Text style={styles.font}>
            Return Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 280,
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
    fontSize: 30,
    letterSpacing: 5,
    padding: 1
  }
});