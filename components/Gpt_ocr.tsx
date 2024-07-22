import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView,ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import { CHATGPT_API_KEY } from '@/database/firebase';

import { update_extracted_drink } from '@/database/todo';
//import { useDrinkContext } from '../database/DrinkContext'



const Gpt_ocr = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
    const { setExtractedDrinks } = useDrinkContext(); // Contextから関数を取得
    const { extractedDrinks } = useDrinkContext(); // Contextからデータを取得

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraStatus === 'granted');
            setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');

            if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'You need to grant camera and media library permissions to use this feature.',
                    [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                );
            }
        };

        requestPermissions();
    }, []);

    const takePictureAndProcess = async () => {
        if (!hasCameraPermission || !hasMediaLibraryPermission) {
            Alert.alert('Permission Required', 'Camera and media library permissions are needed.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const localUri = result.assets[0].uri;
            const base64Image = result.assets[0].base64;

            await MediaLibrary.saveToLibraryAsync(localUri);
            
       
            try {
                const drinks = await extractDrinksWithChatGPT(base64Image);
                setExtractedDrinks(drinks); // ここでOCRで読み取った項目を格納
                console.log("Extracted drinks:", drinks);
                Alert.alert('Success', 'The picture has been processed and drinks extracted.');
            } catch(error) {
                console.error("Error processing image:", error);
                Alert.alert('Error', 'Failed to process the image.');
            }
        }
    };

        // 型指定
        type ChatGPTResponse = {
            choices: {
            message: {
                content: string;
            };
            }[];
        };
  
  

    const extractDrinksWithChatGPT = async (base64Image: string): Promise<string[]>  => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "This image contains a menu. Please extract only the names of alcoholic drinks from this menu. Return the results as a comma-separated list."
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64Image}`
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 300
                },
                {
                    headers: {
                        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("ChatGPT API response:", response.data); 
          
            const extracted_drinks_list = response.data.choices[0].message.content.split(',').map((drink:string) => drink.trim());
            console.log("Extracted drinks list:", extracted_drinks_list);
            update_extracted_drink(extracted_drinks_list);
            return extracted_drinks_list;
            
            //const gpt_extracted_drinks_list = response.data.choices[0].message.content.split(',').map((drink:string) => drink.trim());
            //console.log("Extracted drinks list:", gpt_extracted_drinks_list);
            //return gpt_extracted_drinks_list; //抽出されたドリンク名を返す
        } catch (error) {
            console.error("Error calling ChatGPT API:", error);
            throw error;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.instruction}>メニューの写真を撮ってください</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={styles.buttonDark}
                onPress={takePictureAndProcess} >
                    <Entypo name="camera" size={24} color='#ffefe2' />
                </TouchableOpacity>
            </View>
            {extractedDrinks.length > 0 && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>抽出されたドリンク</Text>
                    {extractedDrinks.map((drink: string, index: number) => (
                        <Text key={index} style={styles.resultText}>{drink}</Text>
                    ))}
                </View>
            )}
             
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    instruction: {
        color: '#22110E',
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '80%',

    },
    buttonDark: {
        backgroundColor: '#8c522c',
        width: 50,
        height: 50,
        padding: 10,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
    resultContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '80%',
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 14,
    },

});

export default Gpt_ocr;