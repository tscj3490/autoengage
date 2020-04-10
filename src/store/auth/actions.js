import * as types from './actionTypes';
import api from '@services/api'

export function login(email, password){
  return dispatch => {
      dispatch({type:types.AUTH_LOGIN, status:types.LOADING, message: ''})
      api.login(email, password, (error, result)=>{
        console.log(error, result)
        if ( error == null ) {
          dispatch({type:types.AUTH_LOGIN, status:result.error?types.FAILED:types.SUCCESS, message:result.message})
        }else{
          dispatch({type:types.AUTH_LOGIN, status:types.FAILED, message:error.message})
        }
      })
  }
} 

export function logout(){
  
  return dispatch => {
    api.logout()
  }
} 

export function signup(data){
  return dispatch => {
      dispatch({type:types.AUTH_REGISTER, status:types.LOADING, message: ''})
      api.signup(data, (error, result)=>{
        console.log(error, result)
        if ( error == null ) {
          dispatch({type:types.AUTH_REGISTER, status:result.success?types.SUCCESS:types.FAILED, message:result.message})
        }else{
          dispatch({type:types.AUTH_REGISTER, status:types.FAILED, message:error.message})
        }
      })
  }
} 

export function getUsers(){
  return dispatch => {
      dispatch({type:types.GET_USERS, status:types.LOADING, message: '', users: []})
      api.getUsers((error, result)=>{
        if ( error == null ) {
          dispatch({type:types.GET_USERS, status:result.success?types.SUCCESS:types.FAILED, message:result.message, users: result.data})
        }else{
          dispatch({type:types.GET_USERS, status:types.FAILED, message:error.message})
        }
      })
  }
} 

