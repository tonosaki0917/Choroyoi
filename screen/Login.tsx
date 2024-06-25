import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Image, Dimensions } from 'react-native';
import { Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { MainStackList } from '../navigation/MainNav'

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/App';

type Navigation = NavigationProp<MainStackList>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<Navigation>();

  const handleLogin = async () => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.displayName);
      console.log(user.uid);
      alert("Hello, " + user.displayName);
      navigation.navigate('Home', {screen: 'Home'});
    } catch (error) {
      console.log(error);
    }     
  };

  const GotoRegister = () => {
    navigation.navigate('Register');
  };
  
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Login.jpg')} style={{width: width, height: height, position: 'absolute'}} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="ログイン" onPress={handleLogin} color="#FFFFFF"/>

      <View style={styles.separator} />

      <Button title="新規登録" onPress={GotoRegister} color="#FFFFFF"/>
    
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
    color: '#FFFFFF',
    position: 'absolute',
    top: '25%', 
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'transparent', // 透明に設定
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // 半透明の背景色
    color: '#FFFFFF', // 入力テキストの色
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#FFFFFF', // セパレータの色
  },
});
