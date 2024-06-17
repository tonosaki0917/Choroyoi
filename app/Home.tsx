import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from 'react-native';

import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackList } from '../navigation/MainNav'
import { HomeStackList } from '@/navigation/HomeNav';

type Navigation = NavigationProp<HomeStackList>;

export default function Home() {

  const route = useRoute<RouteProp<HomeStackList, 'Home'>>();
  const userName = route.params.userName;

  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Text style={styles.body}>{`ようこそ、${userName}!`}</Text>
      <View style={styles.separator} />
      <Button title="アンケート" onPress={() => {navigation.navigate('Questioner');}} />
      <View style={styles.separator}/>
      <Button title="設定" onPress={() => {navigation.navigate('Setting');}} />
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
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
