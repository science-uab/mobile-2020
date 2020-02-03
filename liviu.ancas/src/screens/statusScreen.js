import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, SafeAreaView, FlatList,
    AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default class StatusScreen extends Component {

    constructor(props) {
        super();
        this.aaa = props;
    }

    // componentDidMount() {
    //     setTimeout(() => { this.aaa.navigation.navigate('Rezervare') }, 5000)
    // }


    render() {
        console.log(this.props);


        return (
            <LinearGradient style={styles.container} colors={['#4dd2ff', '#006080']}>
                <TouchableWithoutFeedback style={styles.listContainer} onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <FlatList
                            data={[
                                { key: 'Devin' },
                                { key: 'Dan' },
                                { key: 'Dominic' },
                                { key: 'Jackson' },
                                { key: 'James' },
                                { key: 'Joel' },
                                { key: 'John' },
                                { key: 'Jillian' },
                                { key: 'Jimmy' },
                                { key: 'Julie' },
                            ]}
                            renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                        />
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
        paddingTop: 20
        // backgroundColor: '#0099cc',
    },
    listContainer: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})