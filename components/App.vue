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
      'showWelcome'
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
      }
    }
  }
</script>
