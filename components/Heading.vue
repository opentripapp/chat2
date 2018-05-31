<template>
 <el-row class="pane-header pane-list-header">
  <el-col :span="16" class="pane-list-user">
    <div class="avatar" style="height: 40px;width: 40px;cursor: pointer;">
      <span>
        <img style="height: 40px;width: 40px;" :src="this.profile_picture" class="avatar-image is-loaded">
      </span>
    </div>
  </el-col>
   <el-col :span="8" class="pane-list-controls" >
     <el-row style="top:11px;text-align: right">
       <el-col :span="16">
           <i class="el-icon-message"></i>
       </el-col>

       <el-col :span="8" style="cursor: pointer">
            <el-dropdown trigger="click" >
              <span class="el-dropdown-link" >
               <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logOut">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

       </el-col>
     </el-row>
   </el-col>
 </el-row>
</template>

<script>
    export default{
      data(){
          return {
              profile_picture:this.$store.getters.user.profile_picture || 'https://qiscuss3.s3.amazonaws.com/uploads/55c0c6ee486be6b686d52e5b9bbedbbf/2.png'
          }
      },
      methods:{
        logOut(){
          console.log('logout')
          this.$store.dispatch('logOut')
          window.location.reload()
        }
      }
    }
</script>

<style>
  .menu-horizontal .menu-horizontal-item:first-of-type {
    margin-left: 0;
  }

    .menu-horizontal-item {
      border-radius: 50%;
      -webkit-flex: none;
      flex: none;
      text-align: center;
      transition: background-color .18s ease;
      height: 100%;
    }

  .pane-list-controls {
    -webkit-flex: none;
    flex: none;
    height:100%;
  }
  .pane-header.pane-list-header {
    -webkit-flex: none;
    flex: none;
    height: 59px;
    width: 100%;
    background-color: #eee;
    box-sizing: border-box;
    position: relative;
    z-index: 1000;
    padding: 10px 16px 10px 15px;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }
  .pane-list-user {
    -webkit-flex: 1;
    flex: 1;
  }
  .avatar {
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    background-color: #dfe5e7;
  }
  .avatar-image.is-loaded {
    opacity: 1;
  }
  .avatar-image {
    display: block;
    opacity: 0;
    position: relative;
    transition: opacity 150ms ease-out;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
