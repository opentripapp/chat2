<template>
   <div></div>
</template>



<script>

export default {
  middleware:'auth',
  mounted(){
    this.$nuxt.$router.push('/app')
  }
}
</script>
