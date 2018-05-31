<template>
  <div class="chatlist-panel-body"
       v-infinite-scroll="loadChatList"
       infinite-scroll-disabled="busy"
       infinite-scroll-immediate-check="!isEnd"
       infinite-scroll-throttle-delay="500"
       infinite-scroll-distance="20"
       v-loading="loadingSide" >
    <el-row v-for="item in filteredItems" :key="item.room_id" class="row sideBar-body"  @click.native="openChat(item)" >
      <el-col :span="4" class="col-sm-3 col-xs-3 sideBar-avatar">
        <div class="avatar-icon">
          <img  v-if="item.room_avatar_url != '-dummy-'" :src="item.room_avatar_url">
          <img  v-else src="https://speckyboy.com/wp-content/uploads/2013/10/flat_heros_07.png">
        </div>
      </el-col>
      <el-col :span="20" class="col-sm-9 col-xs-9 sideBar-main">
        <el-row  class="row">
          <el-col :span="16" class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">{{item.room_name}}
                  </span>
          </el-col>
          <el-col :span="8" class="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span class="time-meta pull-right">{{getDate(item.last_comment_timestamp)}}
                  </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" class="sideBar-message">
            <span class="message_meta">
             {{item.last_comment_message}}
            </span>
          </el-col>
          <el-col :span="4" >
            <el-badge  :value="item.unread_count" :max="99" class="item">

            </el-badge>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import moment from 'moment'
  export default{
    props:{
      search: {
        type: String,
        default: ''
      },
    },
    computed: {
      filteredItems() {
          try{
            return this.chat.filter(item => {
              return item.room_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
            })
          }catch (error){
              return []
          }

      },
        ...mapState([
        'chat',
         'isEnd'
      ])
    },
    data(){
      return {
        profile_picture:this.$store.getters.user.profile_picture || 'https://speckyboy.com/wp-content/uploads/2013/10/flat_heros_07.png',
        loadingSide:true,
        busy:false,
        notEnd:true,
        page:1
      }
    },
    methods:{
      async loadChatList(){
        if(this.isEnd){
          return;
        }
        this.busy = true
        this.loadingSide = true
        try{
          await this.$store.dispatch('loadContactMessage',{user_email:this.$store.getters.user.email.data,page:this.page})
          this.loadingSide = false
          this.busy = false
          this.page = this.page + 1
        }catch (err){
          this.loadingSide = false
          this.$message({
            message: err.message,
            showClose: true,
            type: 'error'
          });
        }
      },
      getDate(time){
        return moment(time).fromNow()
      },
      openChat(item){
        try{
            let raw = item.raw_room_name.split(" ");
          let to_start_chat = raw.find((item)=>item !== this.$store.getters.user.email.data)

          switch (item.room_type){
            case "single":
              this.$store.commit('SET_WELCOME',false)
              QiscusSDK.render()
              QiscusSDK.core.UI.chatTarget(to_start_chat)
              break
            case "group":
              this.$store.commit('SET_WELCOME',false)
              QiscusSDK.render()
              QiscusSDK.core.UI.chatGroup(item.room_id)
                  break

          }
          this.$store.commit('SET_ROOM_NOW',item.room_id)
        }catch (error){
          this.$message({
            message: error.message,
            showClose: true,
            type: 'error'
          });
        }
      }
    },
    async mounted(){

      this.$store.commit('SET_WELCOME',true)
      let datas = []
      this.$store.commit('SET_CHAT',datas)
      try{
        await this.$store.dispatch('loadContactMessage',{user_email:this.$store.getters.user.email.data,page:this.page})

        this.loadingSide = false
      }catch (error){
        this.loadingSide =false
        this.$message({
          message: error.message,
          showClose: true,
          type: 'error'
        });
      }

    }
  }
</script>

<style>

  .sideBar-body {
    position: relative;
    padding: 10px !important;
    border-bottom: 1px solid #f7f7f7;
    height: 72px;
    margin: 0 !important;
    cursor: pointer;
  }


  .sideBar-body:hover {
    background-color: #f2f2f2;
  }

  .sideBar-avatar {
    text-align: center;
    padding: 0 !important;
  }

  .avatar-icon img {
    border-radius: 50%;
    height: 49px;
    width: 49px;
  }

  .sideBar-main {
    padding: 0 !important;
  }

  .sideBar-main .row {
    padding: 0 !important;
    margin: 0 !important;
  }

  .sideBar-name {
    padding: 0 0 0 17px!important;
  }

  .sideBar-message{
    padding: 0 10px 10px 17px!important;
  }

  .name-meta {
    font-weight: normal;
    font-size: 19px;
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    text-align: left;
  }

  .message_meta{
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #454545;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    text-align: left;

  }

  .sideBar-time {

  }

  .time-meta {
    text-align: right;
    font-size: 12px;
    padding: 1% !important;
    color: rgba(0, 0, 0, .4);
    vertical-align: baseline;
  }

  .chatlist-panel-body {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    height: calc(100% - 110px);
    background-color: #fefefe;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
  }
</style>
