import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

import { getAuth, updateProfile } from "firebase/auth";
import { auth } from '@/App';


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
});