import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Modal } from 'react-native';
import { Text, View } from 'react-native';

import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackList } from '@/navigation/HomeNav';

import { getAuth, updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from '@/App';

type Navigation = NavigationProp<HomeStackList>;

export default function Setting() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const [isPassModalVisible, setPassModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      setEmail(user.email || '');
      setUsername(user.displayName || '');
    }
  }, []);

  //パスワードの変更
  const changePassword = () => {
    const user = auth.currentUser;
    if (user && currentPass && newPass) {
      const credential = EmailAuthProvider.credential(user.email!, currentPass);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPass)
            .then(() => {
              console.log("Password updated successfully");
              Alert.alert("成功", "パスワードが変更されました");
              setPassModalVisible(false);
            })
            .catch(error => {
              console.error("Error updating password: ", error);
              Alert.alert("エラー", "パスワードの変更に失敗しました\n(少なくとも6文字以上である必要があります)");
            });
        })
        .catch(error => {
          console.error("Error reauthenticating: ", error);
          Alert.alert("エラー", "パスワードが正しくありません");
        });
    } else {
      Alert.alert("エラー", "入力されていません");
    }
  };

  //emailの確認
  const ConfirmEmail = () => {
    if(auth.currentUser){
      if (email !== auth.currentUser.email) {
        setEmailModalVisible(true);
      }
      else{
        CompleteSetting();
      }
    } 
  }

  //emailの変更
  //できませんでした！！
  //たぶんメールアドレスの変更には新しいメールアドレスの認証（認証メールを送ってリンクを踏む手続き）が必要かも。。。
  const ChangeEmail = () => {
    const user = auth.currentUser;
    if (user && currentPass) {
      const credential = EmailAuthProvider.credential(user.email!, currentPass);
        reauthenticateWithCredential(user, credential)
          .then(() => {
        updateEmail(user, email)
          .then(() => {
            console.log("Email updated successfully");
            Alert.alert("成功", "メールアドレスが変更されました");
            setEmailModalVisible(false);
            CompleteSetting();
        })
          .catch(error => {
            console.error("Error updating email: ", error);
            Alert.alert("エラー", "メールアドレスの変更に失敗しました");
          });
        })
        .catch(error => {
          console.error("Error reauthenticating: ", error);
          Alert.alert("エラー", "パスワードが正しくありません");
        });
    } else {
      Alert.alert("エラー", "入力されていません");
    }
  }

  const CompleteSetting = () => {
    if(auth.currentUser){
      const promises = [];

      if (username !== auth.currentUser.displayName) {
        promises.push(updateProfile(auth.currentUser, { displayName: username }));
      }

      Promise.all(promises)
        .then(() => {
          console.log("Profile updated successfully");
          navigation.navigate('Profile');
        })
        .catch(error => {
          console.error("Error updating profile: ", error);
          Alert.alert("Error", "Failed to update profile.");
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>

      <Text style={styles.body}>設定変更</Text>
      <TextInput
        style={styles.input}
        placeholder="ユーザ名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity onPress={() => {setPassModalVisible(true);}}>
        <Text style={styles.changePassword}>パスワードを変更する</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isEmailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>現在のパスワードを入力してください</Text>
            <TextInput
              style={styles.input}
              placeholder="パスワード"
              value={currentPass}
              onChangeText={setCurrentPass}
            />
            <Button title="完了" onPress={ChangeEmail} />
            <Button title="閉じる" onPress={() => setEmailModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={isPassModalVisible}
        onRequestClose={() => setPassModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>現在のパスワードと新しいパスワードを入力してください</Text>
            <Text style={styles.modalInfo}>現在のパスワード</Text>
            <TextInput
              style={styles.input}
              placeholder="パスワード"
              value={currentPass}
              onChangeText={setCurrentPass}
            />
            <Text style={styles.modalInfo}>新しいパスワード</Text>
            <TextInput
              style={styles.input}
              placeholder="パスワード"
              value={newPass}
              onChangeText={setNewPass}
            />
            <Button title="完了" onPress={changePassword} />
            <Button title="閉じる" onPress={() => setPassModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Button title="完了" onPress={ConfirmEmail}/>
      <Button title="戻る" onPress={() => navigation.navigate("Profile")}/>
      <View style={styles.separator} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 20,
  },
  changePassword:{
    fontSize: 20,
    color: '#aaf'
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
});
