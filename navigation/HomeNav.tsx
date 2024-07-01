import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Setting from '@/screen/Setting';
import HomeScreen  from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import QuestionScreen from '../screen/QuestionScreen';
import QuestionSheetScreen from '@/screen/QuestionSheetScreen';
import ResultScreen from '../screen/ResultScreen';
import TakePhotoScreen from '../screen/FillMenuScreen/TakePhotoScreen';
import WriteMenuScreen from '../screen/FillMenuScreen/WriteMenuScreen';

export type HomeStackList = {
    Home: undefined;
    Profile: undefined;
    Question: undefined;
    QuestionSheet: undefined;
    Result: undefined;
    TakePhoto: undefined;
    WriteMenu: undefined;
  };

const Stack = createStackNavigator<HomeStackList>();

export function HomeNavigation() {
  
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="QuestionSheet" component={QuestionSheetScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TakePhoto" component={TakePhotoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WriteMenu" component={WriteMenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }