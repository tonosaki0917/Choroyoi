import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import VerticalText from "./VerticalText";
import { useFonts } from 'expo-font';

interface Props {
    menuItems: string; // メニュー項目
    radius: number;        // 角丸の半径
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const Menu = ({ menuItems, radius, justifyContent, alignItems }: Props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#F8DFC5",
            height: '45%',
            width: '95%',
            borderRadius: radius,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexDirection: 'row-reverse',
            position: 'relative',
            padding: 10,
        },
        menuItemText: {
            fontSize: 15,
            color: '#22110E',
            textAlign: 'center',
            flexWrap: 'wrap', // テキストの折り返し
            marginTop: 10, // 上部マージンを追加して余白を確保
            textAlignVertical: 'center', // 垂直方向の中央揃え
        },
        titleText: {
            fontSize: 30,
            textAlign: 'center',
            top: '5%', // 上部に配置
            left: 0,
            right: '20%',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                <VerticalText text="お品がき" fontSize={30} />
            </Text>
            <Text style={styles.menuItemText}>
                <VerticalText text={menuItems} fontSize={15} />
            </Text>
        </View>
    );
}

export default Menu;
