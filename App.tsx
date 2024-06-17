import React, { useState, useEffect }from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainNavigation } from './navigation/MainNav';

LogBox.ignoreAllLogs();


export default function App() {
    return MainNavigation();
}