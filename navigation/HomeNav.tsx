import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../app/Home';
import Setting from '@/app/Setting';
import Questioner from '@/app/Questioner';

export type HomeStackList = {
    Setting: undefined;
    Questioner: undefined;
    Home: {userName: string | null};
  };

const Stack = createStackNavigator<HomeStackList>();

export function HomeNavigation() {
  
    return (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
          <Stack.Screen name="Questioner" component={Questioner} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
  }