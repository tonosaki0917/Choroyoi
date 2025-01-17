import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';
import { NavigationProp } from '@react-navigation/native';
import NewMenu from '@/components/NewMenu';
import { Entypo } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

import { useState, useCallback, useEffect } from 'react';
import { storage, orderedMenuList, loadOrderedMenu } from '@/components/TachableText';
import { limitNum } from './ProfileScreen';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { firebaseConfig } from '@/database/firebase';
import { auth } from '@/App';

import { FinalAnswers } from './QuestionSheetScreen';
import { findBestThree, getIdAll, getMenu } from '@/database/todo';

type Navigation = NavigationProp<HomeStackList>;

// Firebaseの初期化
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// idで管理
let newMenuItemsId: number[] = [];
// idリストの更新 <= WriteMenuScreen.tsx
export function updateMenuItemsId(newIdList: number[]) {
  newMenuItemsId = newIdList;
}

// 履歴にデータを書き込む
const writeOrderData = (drinks: string[]) => {
  const uid = auth.currentUser?.uid;
  console.log("uid: ", uid);
  for (var x of drinks.reverse()) {
    const item = JSON.parse(x);
    console.log(item);
    if (item.drink === "注文してない") break;
    const date = new Date(item.date).toString();
    firebase.database().ref('history/' + uid + '/' + date).set({
      drink: item.drink,
      date: item.date
    })
      .then(() => {
        console.log('User data saved successfully!', item);
      })
      .catch((error) => {
        console.error('Error saving user data: ', error);
      });
  }
};

export default function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { width, height } = Dimensions.get('window');
  const [menuItems, setMenuItems] = useState<number[]>(newMenuItemsId);
  const [Drinks, setOrder] = useState(orderedMenuList);
  const [limit, setlimit] = useState(limitNum);

  // メニュー項目を取得して設定する関数
  const fetchMenuItems = async () => {
    const selectableList = getMenu();
    const ids = selectableList.map(item => item.id);
    setMenuItems(ids);
  };

  // WriteMenuScreenから戻ったときにmenuItemsIdを更新
  useFocusEffect(
    useCallback(() => {
      if(newMenuItemsId.length === 0){
        console.log("from OCR")
        const idListFromOCR = getIdAll()
        setMenuItemsId(idListFromOCR);
      }else{
        console.log("from written")
        setMenuItemsId(newMenuItemsId);
      }
      //setMenuItems(newMenuItemsId);
    }, [])
  );

  // 画面がフォーカスされたときにメニュー項目を更新
  useEffect(() => {
    fetchMenuItems();
  }, []);

  var drinkList = Drinks.map(item => JSON.parse(item).drink);
  var drinkedNum = 0;
  if (drinkList[0] !== "注文してない") {
    drinkedNum = drinkList.length;
    if (drinkedNum >= limit) {
      alert("ちょっと飲みすぎじゃないですか？");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.allContainer}>
          <View style={styles.menuContainerL}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>お品がき</Text>
              <View style={styles.menuButton}>
                <TouchableOpacity
                  style={styles.buttonDark}
                  onPress={() => navigation.navigate('WriteMenu')}
                >
                  <Entypo name="edit" size={24} color='#ffefe2' />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonLight}
                  onPress={() => navigation.navigate('TakePhoto')}
                >
                  <Entypo name="camera" size={24} color='#ffefe2' />
                </TouchableOpacity>
              </View>
            </View>
            <NewMenu
              menuItems={menuItems}
              radius={8}
              justifyContent='center'
              alignItems='center'
            />
            <View style={styles.buttonRow}>
              <View style={styles.buttonColumn}>
                <TouchableOpacity
                  style={styles.buttonQuestion}
                  onPress={() => navigation.navigate('QuestionSheet')}
                >
                  <Image
                    source={require("../assets/images/checkboard.png")}
                    style={styles.imageStyle}
                  />
                  <Text style={styles.font}>Question</Text>
                </TouchableOpacity>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.buttonLight}
                    onPress={async () => {
                      findBestThree();
                      setlimit(limitNum);
                      setOrder(await loadOrderedMenu());
                    }}
                  >
                    <Entypo name="ccw" size={24} color='#ffefe2' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonLight}
                    onPress={async () => {
                      writeOrderData(Drinks);
                      alert(drinkedNum + "杯飲みました！\n↓↓↓Result↓↓↓\n" + drinkList);
                      storage.remove({ key: "test" });
                      setOrder(await loadOrderedMenu());
                    }}
                  >
                    <Entypo name="controller-stop" size={30} color='#ffefe2' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDark}
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Feather name="user" size={30} color='#ffefe2' />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonResult}
                onPress={() => { navigation.navigate('Result'); console.log(FinalAnswers); }}
              >
                <Image
                  source={require("../assets/images/bell.png")}
                  style={styles.bellimage}
                />
                <Text style={styles.font}>Result</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.font}>{drinkedNum + "／" + limit + "杯目"}</Text>
          </View>
          <FlatList
            data={drinkList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.font}>{item}</Text>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#3d2c25',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  menuContainerL: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#ffefe2',
    fontSize: 30,
    padding: 1,
  },
  imageStyle: {
    flex: 0,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  bellimage: {
    flex: 0,
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  menuButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5,
  },
  buttonDark: {
    backgroundColor: '#8c522c',
    width: 50,
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLight: {
    backgroundColor: '#996d48',
    width: 50,
    height: 50,
    padding: 10,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonQuestion: {
    backgroundColor: '#8c522c',
    width: 180,
    height: '55%',
    padding: 5,
    marginTop: 20,
    marginLeft: 5,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonResult: {
    backgroundColor: '#bb7334',
    width: 170,
    height: '85%',
    padding: 5,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  font: {
    color: '#ffefe2',
    fontSize: 25,
    padding: 1,
  },
});
