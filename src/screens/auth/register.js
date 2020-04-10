'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
    ImageBackground,
    Alert,
    Image,
    StatusBar,
    ActivityIndicator,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import * as commonColors from '@constants/colors'
// import NavBar from '@components/general/navBar';
import * as Color from '@constants/colors'


export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        

        this.state = {
            username: '',
            email: '',
            password: '',
            confirm: '',
            phone: '',
            address: '',
            city: '',
            country: 'United States',
            avatar: null,
        }

    }

   

    render() {

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    {/* <StatusBar hidden={true} /> */}
                    {/* <NavBar title="Sign up" scenes={[0, 1]}/> */}
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.back
    },
    mainContainer: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    firstScreen: {
        alignItems: 'center',
        flex: 1,
    },
    logo1: {
        width: '70%',
        resizeMode: 'contain',
        height: 300,
        marginTop: 30,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: 20,
    },
    button: {
        marginTop: 15,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    signupTheme: {
        backgroundColor: commonColors.darkTheme
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    itemContainer: {
        width: '100%',
        backgroundColor: Color.back,
        marginTop: 15,
        borderBottomWidth: 0.7,
        borderBottomColor: '#555',
    },
    takePictureContainer: {
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    phoneContainer: {
        width: '100%',
        backgroundColor: Color.back,
        marginTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    phoneCodeStyle: {
        backgroundColor: 'red',
        borderBottomWidth: 0.7,
        borderBottomColor: '#555',
        padding: 10,
    },
    countryContainer: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginTop: 15,
        borderBottomWidth: 0.7,
        borderBottomColor: '#555',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 40,
        backgroundColor: 'transparent',
        width: '100%',
        paddingLeft: 40,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor:Color.back
    }, 
    phoneNumInput: {
        height: 40,
        backgroundColor: 'transparent',
        width: '100%',
        paddingRight: 20,
        paddingTop: 10,
    },
    inputIcon: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    inputCountry: {
        flex: 1,
    },
    emptyimgContainer: {
        width: 35,
        height: 35,
        borderRadius: 5,
        borderColor: '#555',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(204,204,204)'
    },
    imgContainer: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 5,
        borderColor: '#555',
        borderWidth: 1,
    }
});
