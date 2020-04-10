import React, { Component } from "react";

import {
    KeyboardAvoidingView,
    NetInfo,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';

import { StackViewStyleInterpolator } from 'react-navigation-stack';
import TabBarIcon from '@components/general/tabBarIcon'
import NavBar from '@components/general/navBar'
import api from './services/api'
import * as Color from '@constants/colors'
import Cache from '@utils/cache'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Login from './screens/auth/login'
import Register from './screens/auth/register'
import Inbox from './screens/presales/inbox'
import Status from './screens/presales/status'
import Settings from './screens/presales/settings'
import Calls from './screens/presales/calls'
import ChatRoom from './screens/presales/leads'

const transitionConfig = () => ({
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

export default class Root extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        StatusBar.setBarStyle('dark-content')
        this.state = {
            isReady: false,
            init: false,
            loggedIn: false,
        }
    }

    componentDidMount() {
        api.init((err, res) => {
            if (err == null) {
                this.setState({ loggedIn: true, init: true });
                this.props.actions.loginStatus(true)
            } else {
                this.setState({ init: true });
                this.props.actions.loginStatus(false)
            }
        });
    }

    render() {
        this.scenes = Actions.create(
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
                    <Lightbox key="lightbox">
                        <Stack key="root" navBar={NavBar}>
                        <Scene key="Login" component={Login} hideNavBar />
                        <Scene key="ChatRoom" component={ChatRoom} hideNavBar />
                        <Tabs
                            key="TabBar"
                            onTabOnPress={() => { }}
                            swipeEnabled
                            tabBarStyle={styles.tabBarStyle}
                            activeBackgroundColor={Color.back}
                            showLabel={false}
                            hideNavBar
                            inactiveBackgroundColor={Color.back}>
                            <Scene key="Inbox" tabBarLabel={'Inbox'}
                                icon={(props) => <TabBarIcon name="message-square" {...props} />} navBar={NavBar}>
                                    <Scene key="Inbox" component={Inbox} hideNavBar />
                            </Scene>
                            <Scene key="Status" tabBarLabel={'Status'}
                                icon={(props) => <TabBarIcon name="life-buoy" {...props} />} navBar={NavBar}>
                                    <Scene key="Status" component={Status} hideNavBar/>
                            </Scene>
                            <Scene key="Calls" tabBarLabel={'Calls'}
                                icon={(props) => <TabBarIcon name="phone" {...props} />} navBar={NavBar}>
                                    <Scene key="Calls" component={Calls} hideNavBar/>
                            </Scene>
                            <Scene key="Settings" tabBarLabel={'Settings'}
                                icon={(props) => <TabBarIcon name="settings" {...props} />} navBar={NavBar}>
                                    <Scene key="Settings" component={Settings} hideNavBar/>
                            </Scene>
                        </Tabs>
                        <Scene key="Register" component={Register} hideNavBar />
                            
                        </Stack>
                    </Lightbox>
                </Modal>
            </Overlay>
        );
        return (
            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1, backgroundColor:Color.back }}>
                <Router scenes={this.scenes} />
            </KeyboardAvoidingView>
        );
    }
}
