"use strict";

import React, { PureComponent } from "react";

import {
  StyleSheet,
  View,
  Platform,
  Modal,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";

// import { screenWidth, screenHeight } from '../../constants/styles'
import * as commonColors from '../../common/colors'
import * as constants from '../../common/constants'
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont()
import { Actions } from "react-native-router-flux";
import NavBar from '@components/general/navBar';
import Api from '../../services/api'

import firebaseService from '../../services/firebaseService'
import { getChatItems } from '../../store/chat/selectors'
import * as actions from '../../store/chat/actions'
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";
import Cache from '../../utils/cache'
import Device from '../../common/device'
import UtilService from '../../utils/util'
import { ScrollView } from "react-native-gesture-handler";



function getMMSSFromMillis(millis) {
  const totalSeconds = millis / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);

  const padWithZero = number => {
    const string = number.toString();
    if (number < 10) {
      return "0" + string;
    }
    return string;
  };
  return padWithZero(minutes) + ":" + padWithZero(seconds);
}

const MyInputLine=({value, onChange, send})=>(
    <TextInput
        placeholder="message"
        multiline={true}
        placeholderTextColor={'grey'}
        underlineColorAndroid="transparent"
        value={value}
        onChangeText={(text) => onChange(text)}
        style={{
            paddingHorizontal: 10,paddingTop:Platform.OS==='android'?0:12,
            borderColor: '#333', borderWidth: 1,
            height: 44, borderRadius:3,flex:1,
            fontSize:13, backgroundColor:'white'
        }}
        returnKeyType={'send'}
        onSubmitEditing={()=>{}}
    />
  )
  
  const YourText=({avatar,userName, color, message, title})=>(
      <View style={{flexDirection:'row', marginTop:10, marginLeft:15}}>
        <View style={styles.title}>
            <Text>{title}</Text>
        </View>
        <View style={{maxWidth:'75%'}}>
            <Text style={{color:'#333', fontSize:12, marginLeft:15}}>{userName}</Text>
          {message.text&&<View style={{flexDirection:'row'}}>
            <View style={styles.yourMsgContainer}>
              <Text style={{color:'black', fontSize:12}}>{message.text}</Text>
            </View>
          </View>}
          {message.image&&<Image source={{uri:message.image}} style={{width:120, height:120, borderWidth:3, borderRadius:8, borderColor:commonColors.theme, marginLeft:15, marginTop:5}}/>}
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}/>
            <Ionicons name="md-checkmark" size={12} color={'#aaa'}/>
            <Text style={{fontSize:12, color:'#aaa', marginLeft:5}}>{UtilService.getHourMinutes(message.createdAt)}</Text>
          </View>
        </View>
        
      </View>
  )
  
  const MyText=({message,showCanceller,deleteMessage, onLongPress})=>(
    <View 
      style={{alignItems:'flex-end', marginTop:10, marginRight:10}}>
      <View style={{flexDirection:'row', maxWidth:'80%'}}>
        <View style={{alignItems:'flex-end'}}>
          {
            !!message.text&&
            <TouchableOpacity 
            onLongPress = {onLongPress}
            style={styles.myMsgContainer}>
              <Text style={{color:'black', fontSize:12}}>{ ((!!message)&&(!!message.text))?message.text:''}</Text>
            </TouchableOpacity>
          }
          {message.image&&<Image source={{uri:message.image}} style={{width:120, height:120, marginRight:10, borderRadius:8, borderWidth:3, borderColor:commonColors.theme}}/>} 
          {message.createdAt&&<View style={{flexDirection:'row', marginRight:15}}>
            <Ionicons name="md-checkmark" size={12} color={'#aaa'}/>
            <Text style={{fontSize:12, color:'#aaa', marginLeft:5}}>{UtilService.getHourMinutes(message.createdAt)}</Text>
          </View>}
          {message.createdAt==null&&<ActivityIndicator style={{ marginRight:15}}/>}
        </View>
        {
          showCanceller &&
          <TouchableOpacity onPress={deleteMessage} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
            <Ionicons name={'md-close-circle'} color={'#999'} size={24}></Ionicons>
          </TouchableOpacity>
        }

      </View>
    </View>
  )

  class Leads extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        message:'',
        recordingTime:'00:00',
        isRecording: false,
        deleteIndex:-1
    };
    this.recording = null;
    this.sound = null;
    this.playIndex = -1;
    this.channel = ''
    this.isMyIdBigger =false
  }

  componentDidMount(){
    this.setState({deleteIndex:-1})
    var myId = Cache.currentUser.user.id
    var yourId = this.props.selectedItem.id
    if(Number(myId)>=Number(yourId)){
      this.channel = myId + '_' + yourId
      this.isMyIdBigger = true
    }else{
      this.channel =  yourId + '_' + myId
      this.isMyIdBigger = false
    }

    let chatRoom = firebaseService.database().ref(this.channel)
    chatRoom.limitToLast(1).once('value', (snapshot) => {
      
      var temp = getChatItems(snapshot.val())[0]
      console.log('snapshot:temp::',temp)
      if(!!temp&&!!(temp.key)){
        if(this.isMyIdBigger){
          firebaseService.database().ref(this.channel+'/'+temp.key).update({cntForBigger:0})
        }
        else{
          firebaseService.database().ref(this.channel+'/'+temp.key).update({cntForSmaller:0})
        }
      }
      
      
    })

    this.props.actions.loadMessages(this.channel)
  }

  sendMessage(){
    // return;
      this.props.actions.sendMessage(this.channel,this.isMyIdBigger, this.props.selectedItem.id,this.state.message, null, null)
      setTimeout(()=>this.setState({message:''}), 100);
  }

  async onMic(){
    return;
  }

  async onShare(){
    return;
  }

  async cancelRecording(){
    return;
  }

  async doneRecording(){
    return;
  }

  renderRecordingModal(){
    return (
      <Modal
        visible={this.state.isRecording}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <Feather name="mic" size={120} color={'white'}/>
          <Text style={{fontSize:24, fontWeight:'bold', color:'white', marginTop:20}}>{this.state.recordingTime}</Text>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
            <TouchableOpacity onPress={()=>this.cancelRecording()} style={{backgroundColor:'red', width:40, height:40, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
              <Ionicons name='ios-close' size={24} color={'white'}/>
            </TouchableOpacity>
            <View style={{width:50}}/>
            <TouchableOpacity onPress={()=>this.doneRecording()} style={{backgroundColor:commonColors.theme, width:70, height:70, borderRadius:35, alignItems:'center', justifyContent:'center'}}>
              <Ionicons name='ios-checkmark' size={50} color={'white'}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  componentDidUpdate() {

    if ((this.props.messages != null) && (this.props.messages.length)) {
        this.flatList.scrollToIndex({animated: true, index: 0});
    }
  }
  deleteMessage(temp,index){
    firebaseService.database().ref(this.channel+'/'+temp.key).remove()
    this.setState({deleteIndex:-1})
  }
  deleteTrigger(temp,index){
    
    this.setState({deleteIndex:index})
  }
  renderItem({item, index}){
    var isCurrentUser = item.user.id == Cache.currentUser.user.id
    var abc = firebaseService.auth();
    console.log("item00000->", this.props.selectedItem)
    if ( isCurrentUser ) {
      return item.voice==null&&
          <MyText 
            message={item} 
            deleteMessage={()=>{this.deleteMessage(item,index)}}
            showCanceller={index==this.state.deleteIndex} onLongPress={()=>{this.deleteTrigger(item,index)}}/>     
    }
    if ( !isCurrentUser ) {
      return item.voice==null&&<YourText userName={this.props.selectedItem.name} title={this.props.selectedItem.title} color={'rgb(192, 233,248)'} message={item}/>
      }
  }
  componentWillReceiveProps(nextProps){
    var tempMessages = getChatItems(this.props.messages)
  }
  render() {
    const item = this.props.selectedItem
    const messages = getChatItems(this.props.messages)
    if ( this.state.tmpMessage ) messages.push(this.state.tmpMessage)
    const data = messages.reverse()
    return (
      <View style={styles.container}>
        <NavBar title={item.name} scenes={[0, 1]}/>
        <ImageBackground source={constants.chat_back} style={{flex:1}}>
          <FlatList
            ref={(c) => { this.flatList = c }}
            style={styles.container}
            contentContainerStyle={data.length?null:styles.flatlistContainer}
            data={data}
            keyExtractor={(item,index) => ''+item.createdAt+'message'+index}
            renderItem={this.renderItem.bind(this)}
            inverted />
          </ImageBackground>

        <View style={{height:1, width:'100%', backgroundColor:'#ccc'}}/>
          <View style={{flexDirection:'row', margin:10, alignItems:'center', backgroundColor:'white', marginBottom:(Device.isIphoneX?20:10)}}>
            <TouchableOpacity style={{backgroundColor:'transparent', marginRight:10}} onPress={()=>this.onShare()}>
              <Feather name="share" size={24} color={commonColors.theme}/>
            </TouchableOpacity>
            <MyInputLine 
              value={this.state.message} 
              onChange={(message)=>this.setState({message})} 
            />
            {this.state.message.length==0&&<TouchableOpacity style={{backgroundColor:commonColors.theme, height:32, width:32, borderRadius:16, alignItems:'center', justifyContent:'center', marginLeft:10}} onPress={()=>this.onMic()}>
              <Feather name="mic" size={18} color={'white'}/>
            </TouchableOpacity>}
            {this.state.message.length>0&&<TouchableOpacity style={{backgroundColor:commonColors.theme, height:32, width:32, borderRadius:16, alignItems:'center', justifyContent:'center', marginLeft:10}} onPress={()=>this.sendMessage()}>
              <Ionicons name="md-send" size={18} color={'white'} style={{marginLeft:Platform.OS=='ios'?2:0, marginTop:Platform.OS=='ios'?2:0}}/>
            </TouchableOpacity>}
          </View>
          {this.renderRecordingModal()}
      </View>
    );
  }
}

export default connect(
  state => ({
    messages: state.chat.messages
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Leads);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  playbackSlider: {
    alignSelf: "stretch"
  },
  flatlistContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    height: 30, 
    width: 30, 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  yourMsgContainer: {
    backgroundColor:'white', 
    padding:10, 
    borderRadius:4, 
    marginLeft:15, 
    marginTop:5,
    shadowColor:'#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  myMsgContainer: {
    backgroundColor:'rgb(220, 248, 198)', 
    padding:10, 
    borderRadius:4, 
    marginRight:15,
    shadowColor:'#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});
