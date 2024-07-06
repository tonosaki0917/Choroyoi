import React, { useState, useEffect } from 'react';
import { Text, View, Modal, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';

//database functions
//形式は変わる可能性あり
import { getAlchol } from '@/database/todo';

interface Props {
  id: number;
}

interface DataType {
  id: number;
  name: string;
  info: string;
}

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {console.log("おしたね");setSelectModalVisible(true);}}
        onLongPress={() => {console.log("長押ししたね");setDetailModalVisible(true)}}
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
            <Text style={styles.modalInfo}>{data.info}</Text>
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
            <Button title="これにする" onPress={() => {console.log("korenisita!") }} />
            <Button title="Close" onPress={() => setSelectModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

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