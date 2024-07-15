import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav'; 
import { NavigationProp } from '@react-navigation/native';

import { Table, Row} from 'react-native-reanimated-table';

import TachableText from '@/components/TachableText';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { auth } from '@/App';

type Navigation = NavigationProp<HomeStackList>;

export default function ProfileScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');

  // 履歴の取り出し
  const readOrderData = () => {
    var hisList = new Array()
    const uid = auth.currentUser?.uid;
    firebase.database().ref('history/' + uid).on('value', (snapshot) => {
      const data = snapshot.val();
      console.log("data:::\n", data)
      console.log(Object.keys(data).length)
      for(let x in data){
        const date = new Date(data[x].date)
        const formattedDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds()}`
        hisList.push([formattedDate, data[x].drink])
        console.log("data:::", data[x].date, " | ", data[x].drink)
      }
    })
    if(hisList.length == 0) hisList = ["---"];
    console.log(hisList)
    return hisList;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <TachableText 
          id={1}>
        </TachableText>
      </View>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={["date", "menu"]} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  readOrderData().map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      style={styles.row}
                      textStyle={styles.text}
                    /> ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
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
  },
  menu: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 6,
    textAlign: 'center'
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  row: { 
    height: 40
  },
  dataWrapper: { 
    marginTop: -1 
  }
});