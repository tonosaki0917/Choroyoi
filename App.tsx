import React, { useState, useEffect }from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import HomeScreen  from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';
import QuestionScreen from './screen/QuestionScreen';
import ResultScreen from './screen/ResultScreen';
import TakePhotoScreen from './screen/FillMenuScreen/TakePhotoScreen';
import WriteMenuScreen from './screen/FillMenuScreen/WriteMenuScreen';



const Stack = createStackNavigator();


LogBox.ignoreAllLogs()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TakePhoto" component={TakePhotoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WriteMenu" component={WriteMenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}