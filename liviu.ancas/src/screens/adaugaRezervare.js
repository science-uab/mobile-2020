import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, SafeAreaView,
    AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default class AdaugaRezervare extends Component {
    render() {
        return (
            <LinearGradient style={styles.container} colors={['#00ffff', '#009999']}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <Text> Adauga rezervare  aici</Text>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </LinearGradient>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})