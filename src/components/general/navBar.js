import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont()
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()
import { Actions } from 'react-native-router-flux';
import * as Color from '@constants/colors'
import Device from '@constants/device'
import * as constants from '@constants/constants'
import device from '../../common/device';
import Cache from '@utils/cache'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { onRight, rightTitle, title, description, scenes, goBack, notifications } = this.props
        
        return (
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {description && description != '' && <Text style={styles.description}>{description}</Text>}
                </View>
                {(goBack || scenes.length > 1) ? <TouchableOpacity onPress={() => goBack ? goBack() : Actions.pop()} style={styles.left}>
                    <Ionicons name="ios-arrow-back" size={30} color={Color.blue} />
                </TouchableOpacity> : <Feather name="edit" size={20} color={Color.blue} />}
                {onRight && rightTitle != '' && <TouchableOpacity onPress={() => onRight()} style={styles.right}>
                    <Text style={styles.rightText}>{rightTitle}</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: Device.navBarHeight + Device.ToolbarHeight,
        paddingTop: Device.ToolbarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.back,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        shadowOpacity: 0.5,
        shadowColor: 'black',
        shadowRadius: 5,
        elevation: 5,
    },

    title: {
        fontSize: 16,
        fontWeight:'bold',
        // color: Color.blue,
    },

    description: {
        marginTop: 5,
        fontSize: 12,
        color: Color.blue,
    },

    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 40
    },

    left: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
    },
    right: {
        position: 'absolute',
        paddingVertical: 8,
        paddingHorizontal: 20,
        bottom: 8,
        right: 0
    },
    rightText: {
        fontSize: 12,
        color: Color.green,
        // fontWeight:'bold'
    },
    badgeContainer: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'red',
        position: 'absolute',
        right: 15,
        top: 8,
    },
    badgeNumber: {
        fontSize: 10,
        color: 'white'
    },
    lastMinute: {
        width: 40,
        height: 24,
        resizeMode: 'contain'
    },
    logo: {
        position: 'absolute',
        left: 0,
        top: device.ToolbarHeight + 3,
        height: 40,
        resizeMode: 'contain',
        width: 90,
    }
})