<template>

  <div>

    <div class="my-container">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <h3 style="line-height: 2px;">{{title}}</h3>
        </div>
        <el-form ref="input" :model="input" style="width: 300px">
          <el-form-item>
            <el-input placeholder="Email" type="email" v-model="input.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="Password" type="password" v-model="input.password" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
        </el-form>
        <div class="bottom clearfix">
          <el-button style="width: 100%;" type="primary" @click="doLogin" v-loading.fullscreen.lock="fullscreenLoading">Masuk</el-button>

        </div>
      </el-card>
    </div>
  </div>
</template>

<style>

  .my-container{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto !important;
    position: relative;
  }

</style>


<script >

  import isEmail from 'validator/lib/isEmail'


  export default{
    middleware:'auth',
    data(){
      return {
        title:'Login',
        input:{
          email:'',
          password:''
        },
        fullscreenLoading:false
      }
    },
    methods:{
      async doLogin(){
        if(!this.input.email){
          return this.$message({
            message: 'Masukan alamat email anda!',
            showClose: true,
            type: 'warning'
          });
        }

        if(!isEmail(this.input.email)){
          return this.$message({
            message: 'Masukan alamat email anda!',
            showClose: true,
            type: 'warning'
          });
        }

        if(!this.input.password){
          this.$message({
            message: 'Masukan kata sandi anda',
            showClose: true,
            type: 'warning'
          });
        }
        this.fullscreenLoading = true
        try{
          await this.$store.dispatch('login',{
            email:this.input.email,
            password:this.input.password
          })
          this.fullscreenLoading = false;

          this.$nuxt.$router.push('/')
        }catch (e){
          this.fullscreenLoading =false
          this.$message({
            message: e.message,
            showClose: true,
            type: 'error'
          });
        }
      }
    },
    head(){
      return {
        title:'Login | OpenTrip',
        meta: [
          { hid: 'description', name: 'description', content: 'Login to opentrip web chat' }
        ]
      }
    }
  }

</script>
