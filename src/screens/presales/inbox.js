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
    Alert,
    ScrollView
} from 'react-native';

import NavBar from '@components/general/navBar';
import Cache from '../../utils/cache'
import { Actions } from 'react-native-router-flux';
import * as commonColors from '@constants/colors'
import * as constants from '../../common/constants'
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

export default class Inbox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [
                {id: 1, title: 'Na', name: 'Narendar', lastMsg: 'Provide me any details', date: '11/21/19'},
                {id: 2, title: 'Ro', name: 'Romita account', lastMsg: 'Mohran Operations:', date: '11/19/19'},
                {id: 12, title: 'Ne', name: 'New NLP team', lastMsg: 'Ganesh: Yes. I will', date: '1/24/20'},
                {id: 4, title: 'Te', name: 'Teachers galore', lastMsg: 'AolsushmaTES left', date: '3/30/20'},
                {id: 5, title: 'Ao', name: 'AolTila Foss', lastMsg: 'Lots of hugs', date: '11/16/19'},
            ],
            lastMessages:[],
        },
        Cache.currentUser = {
            user: {
                id: 2,
                email: 'hantig1986@outlook.com',
            }
        }
    }

    renderItem(item, index) {
        if(item.id ==  Cache.currentUser.user.id)
        {
            return;
        }
        return (
            <TouchableOpacity key={index} onPress={()=>{
                    Actions.ChatRoom({selectedItem:item})
                    }
                }
                activeOpacity={0.7} style={styles.inboxItem}>
                <View style={styles.avatar}>
                    <Text>{item.title}</Text>
                </View>
                <View style={styles.right}>
                    <View style={{ overflow: 'hidden', flex: 1 }}>
                        <Text numberOfLines={1} style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{item.lastMsg}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#aaa', fontSize: 12 }}>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar title="Inbox" scenes={[0]}/>
                <View style={{padding: 20}}>
                    <ScrollView>
                        {this.state.chatList.map((item, index) => this.renderItem(item, index))}
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