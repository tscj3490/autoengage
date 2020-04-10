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
    ScrollView
} from 'react-native';

import NavBar from '@components/general/navBar';
import Cache from '../../utils/cache'
import { Actions } from 'react-native-router-flux';
import * as commonColors from '@constants/colors'
import * as constants from '@constants/constants'
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

export default class Status extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title="Status" scenes={[0]}/>
                <View style={{padding: 20}}>
                    <ScrollView>
                        
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonColors.back,
    },
    inboxItem: {
        marginTop: 8,
        flexDirection: 'row',
        paddingVertical: 7, 
    },
    avatar: {
        marginTop: 8,
        height: 50, 
        width: 50, 
        borderRadius: 25,
        paddingVertical: 7, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonColors.avatar,
    },
    right: { 
        flex: 1,
        borderBottomWidth:1, 
        borderBottomColor:commonColors.avatar, 
        flexDirection: 'row', 
        paddingVertical: 10, 
        marginLeft: 10,
    },
});