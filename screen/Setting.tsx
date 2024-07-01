import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from 'react-native';

import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';

import { getAuth, updateProfile } from "firebase/auth";
import { auth } from '@/App';

type Navigation = NavigationProp<HomeStackList>;



export default function Setting() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<Navigation>();

  const CompleteSetting = () => {
    if(auth.currentUser){
      updateProfile(auth.currentUser, {displayName: username})
      console.log("complete update")
      navigation.navigate('RouteHome');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>

      <Text style={styles.body}>設定変更</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザ名"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="完了して戻る" onPress={CompleteSetting}/>
      <View style={styles.separator} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 20
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
