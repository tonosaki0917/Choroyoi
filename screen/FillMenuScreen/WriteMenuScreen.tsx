import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';

import Checkbox from '@/components/CheckBox';
import { SafeAreaView } from 'react-native-safe-area-context';

import { updateMenuItems } from '../HomeScreen';

type Navigation = NavigationProp<HomeStackList>;

type CheckboxStates = {
  [key: string]: boolean;
};

export default function WriteMenuScreen() {
  const navigation = useNavigation<Navigation>();

  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    op1: false,
    op2: false,
    op3: false,
    op4: false,
    op5: false
  });
  //チェックボックスのボタンを押したとき
  const handleValueChange = (key: string) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  //Returnが押されたとき
  const handleReturn = () => {
    const selectedItems = Object.keys(checkboxStates) //全てのキーを取得
      .filter((key) => checkboxStates[key]) //値がtrueであるキーのみを取得
      .join("/")

    updateMenuItems(selectedItems);
      
    console.log("Selected Items: ", selectedItems);
    navigation.navigate('Home')
  }

  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Checkbox
          label='ビール'
          value={checkboxStates.op1}
          onValueChange={() => {console.log("click check box"); handleValueChange("op1")}}
        />
        <Checkbox
          label='焼酎'
          value={checkboxStates.op2}
          onValueChange={() => {console.log("click check box"); handleValueChange("op2")}}
        />
        <Checkbox
          label='梅酒'
          value={checkboxStates.op3}
          onValueChange={() => {console.log("click check box"); handleValueChange("op3")}}
        />
        <Checkbox
          label='サワー'
          value={checkboxStates.op4}
          onValueChange={() => {console.log("click check box"); handleValueChange("op4")}}
        />
        <Checkbox
          label='日本酒'
          value={checkboxStates.op5}
          onValueChange={() => {console.log("click check box"); handleValueChange("op5")}}
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
    fontSize: 30,
    letterSpacing: 5,
    padding: 1
  }
});