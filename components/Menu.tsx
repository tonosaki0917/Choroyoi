import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import VerticalText from "./VerticalText";

interface Props {
    menuItems: string; // メニュー項目
    radius: number;    // 角丸の半径
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

const Menu = ({ menuItems, radius, justifyContent, alignItems }: Props) => {
    const items = menuItems.split('/');
    const fontSize = items.length >= 10 ? 10 : 15;
    const numColumns = items.length >= 10 ? 2 : 1;

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
                    <VerticalText text={menuItems} fontSize={fontSize} />
                </View>
            );
        } else {
            const halfIndex = Math.ceil(items.length / 2);
            const firstHalf = items.slice(0, halfIndex).join('/');
            const secondHalf = items.slice(halfIndex).join('/');
            return (
                <View style={styles.columnContainer}>
                    <View style={styles.column}>
                        <VerticalText text={firstHalf} fontSize={fontSize} />
                    </View>
                    <View style={styles.column}>
                        <VerticalText text={secondHalf} fontSize={fontSize} />
                    </View>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                <VerticalText text="お品がき" fontSize={30} />
            </Text>
            <View style={styles.menuItemText}>
                {renderColumns()}
            </View>
        </View>
    );
}

export default Menu;
