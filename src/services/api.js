import Cache from "../utils/cache";
import * as config from "../config";
import { NativeModules } from 'react-native'
import UtilService from '../utils/util'
import axios from 'axios'

module.exports = {
  async baseApi(sub_url, method, json_data, cb) {

    var _instance = axios.create({
      baseURL:config.SERVICE_API_URL,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": Cache.currentUser
          ? "bearer " + Cache.currentUser['access_token']
          : null,
      }
    })

    if (method == "GET") {
        _instance.get(config.SERVICE_API_URL + sub_url, null )
        .then((response)=>{
          console.log("response:",response)
          if (response.status == 200) {
            cb(null, response.data);
          } else {
            cb(response.data);
          }
        })
        .catch((error)=>{
          cb(error)
        })
    } else if (method == "POST") {
      _instance.post(config.SERVICE_API_URL + sub_url, JSON.stringify(json_data) )
      .then((response)=>{
        console.log("response:",response)
        if (response.status == 200) {
          cb(null, response.data);
        } else {
          cb(response.data);
        }
      })
      .catch((error)=>{
        cb(error)
      })
    } else if (method == "PUT") {
      _instance.put(config.SERVICE_API_URL + sub_url, JSON.stringify(json_data) )
        .then((response)=>{
          console.log("response:",response)
          if (response.status == 200) {
            cb(null, response.data);
          } else {
            cb(response.data);
          }
        })
        .catch((error)=>{
          cb(error)
        })
    } else if (method == "DELETE") {
      _instance.delete(config.SERVICE_API_URL + sub_url, JSON.stringify(json_data) )
        .then((response)=>{
          console.log("response:",response)
          if (response.status == 200) {
            cb(null, response.data);
          } else {
            cb(response.data);
          }
        })
        .catch((error)=>{
          cb(error)
        })
    }
  },

  async init(cb) {
    //check if current user exists or not
    var email = await UtilService.getLocalStringData('email');
    var password = await UtilService.getLocalStringData('password');

    if (password) {
      this.login(email, password, (err, user) => {
        cb(err, user)
      })
    } else {
      cb('null')
    }
  },

  login(email, password, cb) {
    var pushToken = Cache.pushToken
    var deviceId = Cache.deviceId
    this.baseApi('/api/login', 'POST', { email, password }, (err, res) => {  
      if (err == null) {
        Cache.currentUser = res
        Cache.currentUser.user.password = password
        UtilService.saveLocalStringData('email', email);
        UtilService.saveLocalStringData('password', password);
      }
      cb(err, res)
    })
  },

  logout() {
    Cache.resetMap();
    Cache.currentUser = null;
    UtilService.removeLocalObjectData("email");
    UtilService.removeLocalObjectData("password");
  },

  signup(data, cb) {
    this.baseApi('/api/signup', 'POST', data, (err, res) => {
      cb(err, res)
    })
  },

  async uploadImage(sub_url, file, cb) {
    try {
      let image = {
        uri: file,
        type: "image/jpeg",
        name: "file.jpeg"
      };

      let formData = new FormData();
      formData.append("file", image);
      let response = await fetch(
        config.SERVICE_API_URL + sub_url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          body: formData
        }
      );
      let status = response.status;
      console.log('status', status)

      let responseJson = await response.json();
      console.log('respo', responseJson)
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },

  
  getUsers(cb) {
    this.baseApi('/api/users', 'GET', {}, cb)
  },
};

