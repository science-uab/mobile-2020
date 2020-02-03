import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity,
    AsyncStorage,
    SafeAreaView
} from 'react-native';

import Card from './../components/cards'


export default class MainAppScreen extends Component {

    constructor(props) {
        super();
        this.aaa = props;
    }

    componentDidMount() {


        // console.log(this.state.navigation)
    
         setTimeout(() => {this.aaa.navigation.navigate('Test')}, 5000)
    }

    render() {

        // console.log(this.props);

        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />

                <View style={styles.statusComandaContainer}>
                    <Text style={styles.statusComandaText}> Status Comanda</Text>
                </View>

                <SafeAreaView style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Card />
                        <Card />
                        <Card />
                    </View>
                    <View style={styles.columnContainer}>
                        <Card />
                        <Card />
                        <Card />
                    </View>
                </SafeAreaView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3285a8',
    },
    columnContainer: {
        flexDirection: "column",
    },
    rowContainer: {
        //paddingVertical: 20,
        flexDirection: "row",
        flex: 1,
        alignContent: "center",
        justifyContent: "space-evenly",
    },
    cardContainer: {
        backgroundColor: "green",
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    statusComandaContainer: {
        height: 50,
        backgroundColor: 'darkgray',
        marginTop: 25,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    statusComandaText: {
        alignSelf: "center",
        fontSize: 20,
    }
})