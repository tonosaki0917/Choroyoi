//ふきだしを実装するコンポーネント
//フォント呼び出しあり

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import VerticalText from "./VerticalText";
import { useFonts } from 'expo-font';

interface Props {
    menuItems: string; // メニュー項目
    radius: number;        //角
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const Menu = ({ 
  menuItems, radius,justifyContent, alignItems}: Props) => {
    
    const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8DFC5",
        height: '45%',
        width: '95%',
        borderRadius: radius,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: 'column',
        position: 'relative',
      },
    });
    
    return (
      <View style = {styles.container}>
        <Text style={{
          textAlign: "center",
          position: 'absolute',  // 絶対位置を設定
          right: '3%',  // 右端に固定
          top: '50%',  // 垂直中央に固定
          transform: [{ translateY: -80 }],  // テキストの高さの半分だけ上に移動して中央揃え
        }}>
          <VerticalText 
          text="お品がき"
          fontSize={30} />
        </Text>
        <Text style={{
          fontSize: 10,
          color: '#22110E',
          textAlign: "center",
          flexDirection: 'column',
        }}>
          <VerticalText 
          text={menuItems}
          fontSize={15}  
          />
        </Text>
      </View>
    );
  }

export default Menu;