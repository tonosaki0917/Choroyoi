import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrinkProvider } from '@/database/DrinkContext';

import Login from '../screen/Login';
import { HomeNavigation, HomeStackList } from './HomeNav';
import Register from '@/screen/Register';

export type MainStackList = {
    Login: undefined;
    Register: undefined;
    Home: NavigatorScreenParams<HomeStackList>;
  };

const Stack = createStackNavigator<MainStackList>();

//初めに呼び出されるnavigation
export function MainNavigation() {
  
    return (
      <NavigationContainer>
        <DrinkProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }}/>
        </Stack.Navigator>
        </DrinkProvider>
      </NavigationContainer>
    );
  }