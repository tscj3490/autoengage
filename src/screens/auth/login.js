'use strict';

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ScrollView,
    Alert
} from 'react-native';

import Cache from '@utils/cache'
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import { Actions } from 'react-native-router-flux';
import Spinner from '@components/general/spinner';

import * as commonColors from '@constants/colors'
import * as constants from '@constants/constants'
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()
import * as authAction from '@store/auth';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: 'admin@greenbaypayment.com',
            password: 'Moskva007#',
            isLoading: false,
        },
        Cache.currentUser = {
            user: {
                id: 2,
                email: 'hantig1986@outlook.com',
            }
        }
    }

    register() {
        
    }

    done() {
        let { email, password } = this.state
        Keyboard.dismiss();
        
        if (email == '') {
            Alert.alert('Please enter your email address.');
            return;
        }

        if (password == '') {
            Alert.alert('Please enter your password.');
            return;      
        }

        
        this.props.actions.login(email, password)    
    }

    componentWillReceiveProps(next) {
        if (next.auth.type == 'AUTH_LOGIN') {
          if (next.auth.status == 'SUCCESS') {
            this.setState({ isLoading: false })
            Actions.TabBar()
          }
          if (next.auth.status == 'FAILED') {
            alert('Invalid credentials. Please check your email and password and try again.')
            this.setState({ isLoading: false })
          }
          if (next.auth.status == 'LOADING') {
            this.setState({ isLoading: true })
          }
        }
      }

    render() {
        const { email, password, isLoading } = this.state;
        return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ScrollView style={styles.main}>
                    <View style={styles.logoConatiner}>
                        <Image source={constants.logo} style={styles.logo} />
                    </View>
                    <View style={styles.top}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.note}>Sign In to your account</Text>
                    </View>
                    <View style={styles.middle}>
                        <View style={styles.itemContainer}>
                            <TextInput
                                ref="email"
                                underlineColorAndroid="transparent"
                                value={email}
                                onChangeText={text => this.setState({ email: text })}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                placeholder={'Username'}
                                placeholderTextColor={'grey'}
                                keyboardType="email-address"
                                returnKeyType="next"
                                style={styles.input}
                                onSubmitEditing={() => this.refs.password.focus()}
                            />
                            <Feather name="mail" size={18} color={'#555'} style={styles.inputIcon} />
                        </View>
                        <View style={styles.itemContainer}>
                            <TextInput
                                ref="password"
                                underlineColorAndroid="transparent"
                                value={password}
                                onChangeText={text => this.setState({ password: text })}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                placeholder={'Password'}
                                placeholderTextColor={'grey'}
                                secureTextEntry={true}
                                returnKeyType="next"
                                style={styles.input}
                                onSubmitEditing={() => this.done()}
                            />
                            <Feather name="lock" size={18} color={'#555'} style={styles.inputIcon} />
                        </View>
                    </View>
                    <View style={{flex: 1}} />
                    <TouchableOpacity onPress={() => this.done()} style={[styles.button, { backgroundColor: commonColors.buttonTheme, marginTop: 70 }]}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.register()} style={[styles.button, { backgroundColor: commonColors.darkTheme }]}>
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                    <Text style={[styles.note, { color: commonColors.blue }]}>Forgot password?</Text>                   
                </ScrollView>
                {isLoading ? <Spinner mode="overlay" /> : null}
            </View>
        </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authAction }, dispatch)
});

export default Login = connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.back,
    },
    main: {
        padding: 20,
    },
    logoConatiner: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '60%',
        resizeMode: 'contain',
        height: 250,
    },
    top: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    note: {
        paddingVertical: 10,
        fontSize: 16,
        textAlign: 'center',
        color: commonColors.placeholderColor
    },
    middle: {
        paddingVertical: 30,
    },
    input: {
        borderColor: '#aaa',
        borderWidth: 0.2,
        height: 50,
        backgroundColor: 'transparent',
        paddingLeft: 40,
        paddingRight: 20
    },
    inputIcon: {
        position: 'absolute',
        left: 10,
        top: 15,
    },
    itemContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginTop: 15,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    bottom: {
        position: 'absolute',
        left: 20,
        bottom: 80,
        width: '100%',
    },
    button: {
        marginTop: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    }
});