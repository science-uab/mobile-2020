import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    KeyboardAvoidingView, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { addUserDetails } from './../actions/action'


import { LinearGradient } from 'expo-linear-gradient';
import Navigation from '../navigation/bottomTabNavigator' 

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            serverIP: "",
            logedIn: false,
            loadingData: true,
            username: "",
            password: "",
        }
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const serverIP = await AsyncStorage.getItem('serverIP');

            // console.log("SRV " + serverIP + " token " + token);

            if (serverIP !== null) this.setState({ serverIP: serverIP })

            if (token !== null && serverIP !== null) {
                this.setState({
                    token: token,
                    serverIP: serverIP
                })
                // console.log("checking tocken " + token);
                this.checkToken(this.state)
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    // if we already have token on asyncstorage, check it, if valid log in
    checkToken = async data => {
        (async () => {
            const rawResponse = await fetch('http://' + this.state.serverIP + ':3001/auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "query": "check", "token": data.token })
            });
            const content = await rawResponse.json();
            const parsedResponse = JSON.parse(JSON.stringify(content));

            if (parsedResponse.message.response == "success")  {
                this.setState({ logedIn: true })
                this.props.login(this.state)
            }
        })();
    }

    // try to auth, if success, store token to asyncstorage
    getToken = async () => {

        (async () => {
            const rawResponse = await fetch('http://' + this.state.serverIP + ':3001/auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "query": "auth", "user": this.state.username, "pass": this.state.password })
            });
            const content = await rawResponse.json();
            const parsedResponse = JSON.parse(JSON.stringify(content));

            if (parsedResponse.message.response == "true") {
                try {
                    await AsyncStorage.setItem('token', parsedResponse.message.token);
                    await AsyncStorage.setItem('serverIP', this.state.serverIP)
                } catch (error) {
                    console.log("error saving token")
                }
                this.setState({ logedIn: true })
                this.props.login(this.state)
            } else {
                alert("login fail");
            }
            // console.log(parsedResponse.message.response)
        })();
    }

    render() {
        if (this.state.logedIn) return <Navigation token={this.state.token} />
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                        <LinearGradient style={styles.container} colors={[ '#00ace6','#0099cc','#0086b3', '#006080', '#004d66', '#00394d']}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.logoTitle}>Bar Keeper V0.0.1</Text>
                                <Image source={require('../../assets/waiter3-edit.png')} style={styles.logoImage}></Image>
                            </View>
                            <View style={styles.loginContainer}>
                                <TextInput style={styles.textInput}
                                    placeholder="Server IP Address: eg 192.168.1.100"
                                    value={this.state.serverIP}
                                    keyboardType='number-pad'
                                    onSubmitEditing={() => this.refs.txtUser.focus()}
                                    onChangeText={(serverIP) => this.setState({ serverIP: serverIP })}
                                />

                                <TextInput style={styles.textInput}
                                    placeholder="Username"
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    value={this.state.username}
                                    onSubmitEditing={() => this.refs.txtPass.focus()}
                                    onChangeText={(username) => this.setState({ username: username })}
                                    ref={'txtUser'} />


                                <TextInput style={styles.textInput}
                                    placeholder="Password"
                                    secureTextEntry
                                    ref={'txtPass'}
                                    onSubmitEditing={this.getToken}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({ password: password })}
                                />
                                <TouchableOpacity style={styles.loginButton} ref={'txtLogin'} onPress={this.getToken}>
                                    <LinearGradient
                                        style={styles.loginButtonGradient}   
                                        // start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} 
                                        colors={['#0099cc','#0086b3', '#006080']}>                                    
                                        <Text style={styles.loginButtonText}>LOGIN</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

// maps state
const mapStateToProps = (state) => {
    return {
        userState: state.appReducer.userState
    }
}
// map actions
const mapDispatchToProps = (dispatch) => {
    return {
        login:(userState) => dispatch(addUserDetails(userState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3285a8',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    logoTitle: {
        padding: 10,
        fontSize: 20,
        opacity: 0.6,
    },
    logoImage: {
        width: 150,
        height: 150,
    },
    loginContainer: {
        position: 'absolute',
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor:'red',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
    },
    textInput: {
        padding: 3,
        paddingHorizontal: 10,
        fontSize: 12,
        backgroundColor: '#186485',
        width: 250,
        marginBottom: 10,
        borderRadius: 10,
        textAlign: 'center',
        color: 'white'
    },
    loginButton: {
        width: 250,
        height: 35,    
    },
    loginButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#ccf2ff',
        fontSize: 15,
        fontWeight: 'bold'
    }

});
