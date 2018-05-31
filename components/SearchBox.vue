<template>
  <div class="chatlist-panel-search">
    <el-input
      placeholder="Search"
      icon="search"
      @change="onChange"
    >
    </el-input>
  </div>
</template>

<script>
    export default{
        methods: {
          onChange (e) {
            this.$emit('update', e)
          }
        }
    }
</script>

<style>
  .chatlist-panel-search {
    background-color: #fbfbfb;
    -webkit-flex: none;
    flex: none;
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
</style>
