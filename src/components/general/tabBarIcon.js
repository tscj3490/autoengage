import React from 'react';
import { View, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont()
import * as Color from '@constants/colors'

export default class TabBarIcon extends React.Component {

  render() {
    let { name, focused, tabBarLabel } = this.props
    return (
      <View style={{ alignItems: 'center' }}>
        <Feather name={name} size={20} color={focused?Color.blue:"#333"}/>
        <Text style={{ fontSize: 10, color:(focused?Color.blue:"#333")}} >
          {tabBarLabel}
        </Text>
      </View>
    )
  }
}