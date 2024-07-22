import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//database functions
//形式は変わる可能性あり
import { getAlchol } from '@/database/todo';

interface Props {
  id: number;
}

interface DataType {
  id: number;
  name: string;
  information: string;
}

//ストレージの作成
export const storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
})

// 未注文なら初期値
export var orderedMenuList = [JSON.stringify({
  drink: "注文してない"
})];
export const key = "test"

const TachableText: React.FC<Props> = ({ id }) => {
  const [data, setData] = useState<DataType | null>(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [isSelectModalVisible, setSelectModalVisible] = useState(false);

  useEffect(() => {
    setData(getAlchol(id));
  }, [id]);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  async function selectOrder(name:string){
    console.log("korenisita!")
    // 登録データの設定
    const value = JSON.stringify({
      drink : name,
      date : new Date()
    })
  
    // 一時格納用
    var drink_data = new Array()
  
    // 前回までの登録データをの取り出し・再登録
    await storage.load({ 
      key : key
    }).then(data =>{
      for(let item of data){
        //console.log("item :::\t\t\t", item)
        drink_data.push(item)
      }
    }).catch(err => {
      console.log("err: ", err);
    });
  
    drink_data.push(value);
    console.log("pushed data: ", drink_data)
  
    storage.save({
      key: key,
      data: drink_data,
    })
  
    orderedMenuList = await loadOrderedMenu()
    console.log("押しました", orderedMenuList);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("おしたね");
          setSelectModalVisible(true);
        }}
        onLongPress={() => {
          console.log("長押ししたね");
          setDetailModalVisible(true);
        }}
      >
        <Text style={styles.text}>{data.name}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isDetailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{data.name}</Text>
            <Text style={styles.modalInfo}>{data.information}</Text>
            <Button title="Close" onPress={() => setDetailModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isSelectModalVisible}
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>これにする？</Text>
            <Button title="これにする" onPress={ () => {
              selectOrder(data.name)
              alert(data.name+"を選びました！\n注文しましょう")
              setSelectModalVisible(false)
              } } />
            <Button title="Close" onPress={() => setSelectModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export function loadOrderedMenu(){
  return storage.load({
    key: key
  }).then(data =>{
    for(let item of data){
      item = JSON.parse(item)
      //console.log("drink:::::::::::::::", item.drink)
      //console.log("date::::::::::::::::", item.date)
    }
    return data;
  }).catch(err =>{
    return [JSON.stringify({drink: "注文してない"})]
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default TachableText;