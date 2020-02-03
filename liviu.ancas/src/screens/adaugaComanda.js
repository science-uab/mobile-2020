import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, SafeAreaView,
    AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



class AdaugaComanda extends Component {

    componentDidMount() {
        const rawResponse = fetch('http://192.168.1.150:3001/category', {
            method: 'GET'
        });


        fetch('http://192.168.1.150:3001/category')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson);
        });

        // console.log(rawResponse);
        // const content = rawResponse.json();
        // const parsedResponse = JSON.parse(JSON.stringify(content));

        // console.log(parsedResponse);

    }

    render() {

        return (
            <LinearGradient style={styles.container} colors={['#dfbf9f', '#bf8040']}>
                <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                    <SafeAreaView>
                        <Text> Adauga comanda  aici
                            {this.props.userState}

                        </Text>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </LinearGradient>
        )
    }
}
export default connect(mapStateToProps)(AdaugaComanda);


// maps state
const mapStateToProps = (state) => {
    console.log("aaa" + state);
    return {
        userState: state.appReducer.userState
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})