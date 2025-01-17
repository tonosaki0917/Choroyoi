import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';

type Navigation = NavigationProp<HomeStackList>;

export default function QuestionScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('QuestionSheet')}
        >
          <Text style={styles.font}>
            Start Quetioner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('RouteHome')}
        >
          <Text style={styles.font}>
            Return Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 205,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 170, 
    backgroundColor: 'white',
    padding: 0,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'black',
  },
  font: {
    color: 'black', 
    fontSize: 30,
    letterSpacing: 5,
    padding: 1
  }
});