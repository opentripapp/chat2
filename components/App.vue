<template>
  <div class="cDiv">
    <background></background>
    <el-row class="container app">
      <el-col :span="8" style="height: 100%;   background-color: #fefefe;">
        <heading></heading>
        <search  @update="updateSearch"></search>
        <contact-list v-bind:search="search"></contact-list>
      </el-col >
      <el-col :span="16" style="height: 100%">
        <div class="message">
          <div id="qiscus-widget" ></div>
          <welcome v-if="showWelcome"></welcome>
        </div>
      </el-col>
    </el-row>


  </div>
</template>



<script>

  require('~/assets/main.css');

  import Background from '~/components/Background'
  import Heading from '~/components/Heading'
  import Welcome from '~/components/Welcome'
  import Search from '~/components/SearchBox'
  import ContactList from '~/components/ContactList'
  import {mapState} from 'vuex'



  export default {
    computed: mapState([
      'showWelcome',
      'authenticated',
      'total_unread'
    ]),
    data(){
      return {
          search:''
      }
    },
    components:{
      Background,
      Heading,
      Welcome,
      Search,
      ContactList
    },
    methods:{
      updateSearch (v) {
        this.search = v
      },
      init(){
        this.loading = true
        let that = this
        let user = this.$store.getters.user
        this.$store.commit('SET_ROOM_NOW',0)
        this.$store.commit('SET_UNREAD_COUNT',0)

        QiscusSDK.core.init({
          AppId: 'opentripa-4qe8taovu15',
          mode:'wide',
          options: {
            // When we're success login into qiscus SDK we'll have a 1-on-1 chat to guest2@qiscus.com
            // You can change this to any user you have on your AppId, e.g: contact@your_company.com, etc
            loginSuccessCallback(data) {
              console.log('success_initialize chat')
              that.loading=false
              //that.$store.dispatch('initSocketIO',{email:user.email.data})
            },
            newMessagesCallback(data) {
              if(!that.authenticated){
                return;
              }
              if(data.length === 1){
                data.forEach((itm)=>{

                  if(itm.email !== user.email.data){
                    let popsound = new Audio('/popsound.mp3');
                    popsound.load();
                    popsound.play();
                    that.$store.commit('ADD_OR_UPDATE_CHAT',itm)
                  }
                  if(itm.email === user.email.data){
                    that.$store.commit('JUST_UPDATE',itm)
                  }
                  if(itm.room_id !== that.$store.getters.room && itm.email !== user.email.data){
                    that.$store.commit('PLUS_UNREAD',1)
                    if (Notification.permission === "granted") {
                      let notification = new Notification(itm.username, {
                        dir: "auto",
                        body: itm.message,
                        tag: itm.chat_type,
                        icon:itm.user_avatar_url
                      });
                      notification.onshow = function(){
                        setTimeout(()=>{
                          notification.close();
                        }, 3000);
                      }
                    }else{
                      Notification.requestPermission(function (permission) {
                        // If the user accepts, let's create a notification

                      });
                    }
                  }
                });
              }
            },
          }
        });
        QiscusSDK.core.setUser(user.email.data, user.password, user.name,user.profile_picture);
      }
    },
    mounted(){
      this.init()
    }
  }
</script>
