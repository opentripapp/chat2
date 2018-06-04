<template>
  <app ></app>
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
        'total_unread'
      ])
    },
    components:{
      App
    }
  }
</script>
