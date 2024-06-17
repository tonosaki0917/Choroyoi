import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MainStackList } from '../navigation/MainNav'

type Navigation = NavigationProp<MainStackList>;

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<Navigation>();

  const handleRegist = () => {
    // 新規登録処理
    if (username === 'exist') {
      console.log("already exist");
      Alert.alert("Error", "Invalid username");
    } else {
        console.log("success!");
        Alert.alert("Success", "complete register");
        navigation.navigate('Home', {screen: 'Home', params: { userName: username }});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新規登録</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザ名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="登録" onPress={() => {console.log("Button pressed"); handleRegist();}} />

      <View style={styles.separator} />

      <Button title="ログイン画面に戻る" onPress={() => {navigation.navigate('Login');}} />

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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});
