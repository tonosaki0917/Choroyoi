import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

import { getAuth, updateProfile } from "firebase/auth";
import { auth } from '@/App';

import { Table, Row } from 'react-native-reanimated-table';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import InputNumberStyles from 'rmc-input-number/lib/styles';

type Navigation = NavigationProp<HomeStackList>;

var InputNumber = require('rmc-input-number');
export let limitNum = 6;

export default function ProfileScreen() {

  const [currentEmail, setCurrentEmail] = useState('');
  const [currentDisplayName, setCurrentDisplayName] = useState('');

  //画面がフォーカスされたときに実行される
  useFocusEffect(
    useCallback(() =>{
      if (auth.currentUser) {
        setCurrentEmail(auth.currentUser.email || '');
        setCurrentDisplayName(auth.currentUser.displayName || '');
      }
    }, [])
  )

  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');

  // 履歴の取り出し
  const readOrderData = () => {
    var hisList = new Array()
    const uid = auth.currentUser?.uid;
    firebase.database().ref('history/' + uid).on('value', (snapshot) => {
      const data = snapshot.val();
      console.log("data:::\n", data)
      console.log(Object.keys(data).length)
      for(let x in data){
        const date = new Date(data[x].date)
        const formattedDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()}`
        hisList.push([formattedDate, data[x].drink])
        console.log("data:::", data[x].date, " | ", data[x].drink)
      }
    })
    if(hisList.length == 0) hisList = [["---", "---"]];
    console.log(hisList)
    return hisList;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileRow}>
          <Text style={styles.userName}>{currentDisplayName}</Text>
          <TouchableOpacity 
            style={styles.buttonDark}
            onPress={() => navigation.navigate('Setting')}
          >
            <Entypo name="edit" size={18} color='#ffefe2'/>
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>{currentEmail}</Text>
        <Text style={styles.message}>上限設定</Text>
        <InputNumber
          defaultValue={limitNum}
          min={0}
          max={300}
          onChange={(value: number) => {
            limitNum = value;
            console.log(limitNum);
          }}
          styles={InputNumberStyles}
        />
      </View>
      
      <Text style={styles.message}>飲酒履歴</Text>
      <View style={styles.rowContainer}>
        <ScrollView horizontal={true}>
          <View>
            <Table 
            borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}
            >
              <Row data={["date", "menu"]} style={styles.head} textStyle={styles.headText}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  readOrderData().map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      style={styles.row}
                      textStyle={styles.text}
                    /> ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('RouteHome')}
        >
          <Entypo name="home" size={35} color= '#ffefe2'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffefe2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 2,
    height: 300,
    backgroundColor: '#ffefe2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 2,
    paddingTop: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%', 
    paddingHorizontal: 30,
  },
  message: {
    fontSize: 25,
    color: '#22110E',
    textAlign: 'left',
    paddingTop: 20
  },
  button: {
    width: 170, 
    height: 50,
    backgroundColor: '#22110E',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
  },
  font: {
    color: '#ffefe2', 
    fontSize: 30,
    letterSpacing: 5,
    padding: 1
  },
  userName: {
    fontSize: 50,
    color: '#22110E',
    textAlign: 'left',
  },
  email: {
    fontSize: 30,
    color: '#22110E',
    textAlign: 'left',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonDark: {
    backgroundColor: '#8c522c',
    width: 40,
    height: 40,
    padding: 5,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headText: {
    color: '#ffefe2',
    margin: 6,
    textAlign: 'center'
  },
  text: {
    margin: 6,
    textAlign: 'center'
  },
  head: { 
    height: 40, 
    backgroundColor: '#22110E' 
  },
  row: { 
    height: 40,
    width: 300
  },
  dataWrapper: { 
    marginTop: -1 
  }
});