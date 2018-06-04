<template>
  <app v-loading.fullscreen.lock="loading"></app>
</template>



<script>

  import App from '~/components/App'
  import {mapState} from 'vuex'

  export default {
    middleware:'auth',
    data(){
      return{
        loading:false
      }
    },
    head () {
      return {
        title: this.total_unread > 0 ? "(" + this.total_unread + ") OpenTrip":"OpenTrip",
        meta: [
          { hid: 'description', name: 'description', content: 'OpenTrip Web client for chat' }
        ]
      }
    },
    computed:{
      ...mapState([
        'authenticated',
        'total_unread'
      ])
    },
    components:{
      App
    },
    methods:{
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
              if(data.length == 1){
                data.forEach((itm)=>{

                  if(itm.email != user.email.data){
                    let popsound = new Audio('/popsound.mp3');
                    popsound.load();
                    popsound.play();
                    that.$store.commit('ADD_OR_UPDATE_CHAT',itm)
                  }
                  if(itm.email == user.email.data){
                    that.$store.commit('JUST_UPDATE',itm)
                  }
                  if(itm.room_id != that.$store.getters.room && itm.email != user.email.data){
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
      try{
        this.init()
      }catch(err){
        this.init()
      }
    }

  }
</script>
