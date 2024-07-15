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

import { Table, Row} from 'react-native-reanimated-table';

import TachableText from '@/components/TachableText';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

type Navigation = NavigationProp<HomeStackList>;

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
    if(hisList.length == 0) hisList = ["---"];
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

        <Text style={styles.message}>アレルギー情報？</Text>

        <Text style={styles.message}>今までの履歴？</Text>


      </View>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={["date", "menu"]} style={styles.head} textStyle={styles.text}/>
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
  profileContainer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingTop: 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%', 
    paddingHorizontal: 30,
    padding: 10
  },
  message: {
    fontSize: 25,
    color: '#22110E',
    textAlign: 'left',
    paddingTop: 20
  },
  button: {
    width: 170, 
    backgroundColor: 'gray',
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
    backgroundColor: '#90B0FF',
    width: 40,
    height: 40,
    padding: 5,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: 6,
    textAlign: 'center'
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  row: { 
    height: 40
  },
  dataWrapper: { 
    marginTop: -1 
  }
});