/**
 * Created by muharizals on 04/10/2017.
 */
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import {BASE_URL,HEADERS,QISCUS_BASE_URL,QISCUS_SECRET,SOCKET_CHAT} from './config.env'



export const state = () =>({
  user:null,
  authenticated:false,
  chat:[],
  isEnd:false,
  showWelcome:true,
  room:0,
  total_unread:0
})

export const plugins = [createPersistedState({
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 7, secure: false }),
    removeItem: key => Cookies.remove(key)
  }
})]

export const mutations = {
  SET_END:function (state,status) {
    state.isEnd = status
  },
  SET_USER: function (state,user) {
    state.user = user
  },
  SET_AUTH:function (state,auth) {
    state.authenticated = auth
  },
  SET_CHAT:function (state,chat) {
    state.chat = chat
  },
  SET_UNREAD_COUNT:function (state,count) {
    state.total_unread= count
  },
  PLUS_UNREAD:function (state,count) {
    state.total_unread = state.total_unread + count
  },
  PUSH_CHAT:(state,items)=>{
    items.forEach((item)=>{
        state.total_unread = state.total_unread + item.unread_count
        state.chat.push(item)
    })
  },
  SET_WELCOME:function (state,show) {
    state.showWelcome = show
  },
  SET_ROOM_NOW:function (state,no_room) {
    state.room = no_room
    if(no_room != 0 ){
      let index = state.chat.findIndex((itm)=>itm.room_id == no_room)
      if(index > -1){
        state.total_unread = state.total_unread - state.chat[index].unread_count;
        state.chat[index].unread_count = 0
      }
    }
  },
  JUST_UPDATE:function (state,data) {
    let index = state.chat.findIndex((itm)=>itm.room_id == data.room_id)
    if(index > -1){
      state.chat[index].last_comment_message = data.message
      state.chat[index].last_comment_timestamp = data.timestamp
    }
  },
  ADD_OR_UPDATE_CHAT:function (state,data) {
    let id = data.room_id
    let index = state.chat.findIndex((itm)=>itm.room_id == id)
    if(index > -1){
      state.chat[index].last_comment_message = data.message
      state.chat[index].last_comment_timestamp = data.timestamp
      state.chat[index].unread_count++
      if(state.room == data.room_id){
        state.chat[index].unread_count = 0
      }
      if(index != 0){
        let removed = state.chat.splice(index,1)
        state.chat.unshift(removed[0])
      }

    }else{
      let newItem = {
        last_comment_message: data.message,
        raw_room_name: data.email,
        last_comment_timestamp: data.timestamp,
        room_avatar_url: data.room_avatar,
        room_id: data.room_id,
        room_name: data.room_name,
        room_type: data.chat_type,
        unread_count: 1
      }
      state.chat.unshift(newItem)
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.authenticated
  },
  user(state){
    return state.user
  },
  room(state){
    return state.room
  }
}

export const actions = {
  async login({commit},{email,password}){
    try{
      const {data} = await axios.post(BASE_URL+"user/login",{
        email,password
      },HEADERS)
      if(data.error){
        throw {message:data.message}
      }
      if(!data.error){
        data.data.password = password
        commit('SET_USER',data.data)
        commit('SET_AUTH',true)
      }else{
        throw {message:"Terjadi kesalahan tidak diketahui"}
      }
    }catch (error){
      throw error
    }
  },
  async loadContactMessage({commit},{user_email,page}){
      try{
        const {data} = await axios.get(BASE_URL + "chat/get_user_rooms",{
          params:{
            email:user_email,
            page:page
          },
          headers:HEADERS.headers
        })

        if(data.error){
          throw {message:data.message}
        }
        if(!data.error){
          if(data.data.results.rooms_info.length === 0){
            commit('SET_END',true)
            return;
          }
          commit('PUSH_CHAT',data.data.results.rooms_info)
        }else{
          throw {message:"Terjadi kesalahan tidak diketahui"}
        }

      }catch (error){
        throw error
      }
  },

  logOut({commit}){
    commit('SET_USER',null)
    commit('SET_AUTH',false)
    commit('SET_CHAT',[])
  }
}
