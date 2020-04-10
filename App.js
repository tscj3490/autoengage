/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux'
import { configureStore } from './src/store'
import Router from "./src/router";

const store = configureStore()

export default class Driver extends Component {
  s
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
