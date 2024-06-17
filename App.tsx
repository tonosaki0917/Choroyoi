import React, { useState, useEffect }from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigation } from './navigation/MainNav';

import { firebaseConfig } from './database/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

LogBox.ignoreAllLogs();


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {
    return MainNavigation();
}