import * as types from "./actionTypes";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  type: types.NONE,
  status: types.NONE,
  message: '',
  users: [],

};

export default function common(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        isLoggedIn: action.status === types.SUCCESS,
        type: action.type,
        status: action.status,
        message: action.message
      }
    case types.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedOut: action.status === types.SUCCESS,
        type: action.type,
        status: action.status,
      }
    case types.AUTH_REGISTER:
      return {
        ...state,
        type: action.type,
        status: action.status,
        message: action.message
      }
    case types.GET_USERS:
      return {
        ...state,
        type: action.type,
        status: action.status,
        message: action.message,
        users: action.users
      }
    default:
      return state;
  }
}
