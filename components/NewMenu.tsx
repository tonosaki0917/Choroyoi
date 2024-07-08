import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TachableText from "./TachableText";

interface Props {
    menuItems: number[]; // メニュー項目
    radius: number;    // 角丸の半径
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const NewMenu = ({ menuItems, radius, justifyContent, alignItems }: Props) => {
    const fontSize = menuItems.length >= 10 ? 10 : 15;
    const numColumns = menuItems.length >= 10 ? 2 : 1;

    const styles = StyleSheet.create({
        container: {
            flex: 0,
            backgroundColor: "#f1e1d1",
            height: '60%',
            width: '100%',
            borderRadius: radius,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexDirection: 'row-reverse',
            padding: 10,
        },
        menuItemText: {
            fontSize: fontSize,
            color: '#22110E',
            textAlign: 'center',
            flexWrap: 'wrap',
            marginTop: 10,
            textAlignVertical: 'center',
            flex: 1,
        },
        titleText: {
            fontSize: 30,
            textAlign: 'center',
            position: 'absolute',
            right: 10,
            top: 10,
        },
        columnContainer: {
            flexDirection: 'column',
            flex: 1,
        },
        column: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    const renderColumns = () => {
        if (numColumns === 1) {
            return (
                <View style={styles.column}>
                    {menuItems.map((item: number, itemIndex: number) => 
                        <TachableText id={item}/>)
                    }           
                </View>
            );
        } else {
            const halfIndex = Math.ceil(menuItems.length / 2);
            const firstHalf = menuItems.slice(0, halfIndex);
            const secondHalf = menuItems.slice(halfIndex);
            return (
                <View style={styles.columnContainer}>
                    <View style={styles.column}>
                        {firstHalf.map((item: number, itemIndex: number) => 
                            <TachableText id={item}/>)
                        }  
                    </View>
                    <View style={styles.column}>
                        {secondHalf.map((item: number, itemIndex: number) => 
                            <TachableText id={item}/>)
                        } 
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuItemText}>
                {renderColumns()}
            </View>
        </View>
    );
}

export default NewMenu;
