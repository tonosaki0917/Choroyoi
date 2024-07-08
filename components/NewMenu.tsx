import React from "react";
import { View, StyleSheet } from 'react-native';
import TachableText from "./TachableText";

interface Props {
    menuItems: number[]; // メニュー項目
    radius: number;    // 角丸の半径
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const NewMenu = ({ menuItems, radius, justifyContent, alignItems }: Props) => {
    const fontSize = menuItems.length >= 10 ? 10 : 15;
    let numColumns = 1;
    if (menuItems.length >= 9) {
        numColumns = 3;
    } else if (menuItems.length >= 6) {
        numColumns = 2;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 0,
            backgroundColor: "#f1e1d1",
            height: '50%',
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
        columnContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
        },
        column: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    const renderColumns = () => {
        const columnLength = Math.ceil(menuItems.length / numColumns);
        const columns = [];

        for (let i = 0; i < numColumns; i++) {
            const start = i * columnLength;
            const end = start + columnLength;
            const items = menuItems.slice(start, end);

            columns.push(
                <View key={i} style={styles.column}>
                    {items.map((item: number) => 
                        <TachableText key={item} id={item}/>
                    )}
                </View>
            );
        }

        return (
            <View style={styles.columnContainer}>
                {columns}
            </View>
        );
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
