import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity,
    AsyncStorage,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default class StatusComanda extends Component {
    constructor(props) {
        super();
        this.aaa = props;
    }

    componentDidMount() {
        setTimeout(() => { this.aaa.navigation.navigate('Rezervare') }, 5000)
    }

    render() {

        console.log(this.props);

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <LinearGradient style={styles.container} colors={['#e68a00', '#33adff']}>
                        <SafeAreaView>
                            <Text> STatus comanda aici</Text>
                        </SafeAreaView>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
})
