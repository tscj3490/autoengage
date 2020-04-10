import React from 'react'

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

import * as Color from '@constants/colors'

export default class MyTabBar extends React.Component{
    render(){
        let {title, index, onChange} = this.props
        return(
            <View style={styles.container}>
                {title.map((title, idx)=><TouchableOpacity onPress={()=>onChange(idx)} key={idx} style={styles.itemContainer}>
                    <Text style={[styles.title, index==idx?{color:'blue', fontWeight:'bold'}:{color:'#333'}]}>{title}</Text>
                </TouchableOpacity>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height:36,
        borderRadius:4,
        borderWidth:1,
        borderColor:Color.back,
        overflow:'hidden',
        flexDirection:'row'
    },
    title:{
        fontSize:12,
        color:Color.back
    },
    itemContainer:{
        width:100,
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
    }
})