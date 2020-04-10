import * as types from './actionTypes'
import firebaseService from '@services/firebaseService'
import Cache from '../../utils/cache'
import { getChatItems } from '../../store/chat/selectors'
const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages')
const FIREBASE_REF_MESSAGES_LIMIT = 50

export const sendMessage = (channel,isMyIdBigger,receiverId, message, uri, voice) => {
   console.log('channel,message,uri,voice',channel,message,uri)
  return (dispatch) => {
    dispatch(chatMessageLoading())
    let createdAt = new Date().getTime()
    let chatMessage = {
      text: message,
      createdAt: createdAt,
      user: {
        id: Cache.currentUser.user.id,
        email: Cache.currentUser.user.email
      },
      receiverId,
      image: uri,
      voice,
    }

    let chatRoom = firebaseService.database().ref(channel)
    chatRoom.limitToLast(1).once('value', (snapshot) => {
       var temp = getChatItems(snapshot.val())[0]
       var tempBigCnt = 0
       var tempSmallerCnt = 0

       if(!!temp && !!temp.cntForBigger){
        console.log('!!temp.cntForBigger on CntForBigger',!!temp.cntForBigger) 
        tempBigCnt = temp.cntForBigger
       }
       if(!!temp && !!temp.cntForSmaller){
        console.log('!!temp.cntForBigger on CntForSmaller',!!temp.cntForSmaller) 
        tempSmallerCnt = temp.cntForSmaller
       }
       console.log('tempBigCnt and tempSmallerCnt=',tempBigCnt,tempSmallerCnt)
       if(isMyIdBigger){
         console.log('')
         tempSmallerCnt++;
       }
       else{
         tempBigCnt++;
       }
       chatMessage.cntForBigger = tempBigCnt;
       chatMessage.cntForSmaller = tempSmallerCnt;
       firebaseService.database().ref(channel).push().set(chatMessage, (error) => {
          if (error) {
            dispatch(chatMessageError(error.message))
          } else {
            dispatch(chatMessageSuccess())
          }
        })
    })


   
  }
}

export const updateMessage = text => {
  return (dispatch) => {
    dispatch(chatUpdateMessage(text))
  }
}

export const loadMessages = (channel) => {
  let chatRoom = firebaseService.database().ref(channel)
  return (dispatch) => {
      chatRoom.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      dispatch(loadMessagesSuccess(snapshot.val()))
    }, (errorObject) => {
      dispatch(loadMessagesError(errorObject.message))
    })
  }
}

const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
})

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
})

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
})

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
})

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
})
