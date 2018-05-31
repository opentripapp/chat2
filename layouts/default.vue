<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>

  html {
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar {
    width: 6px!important;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.2);
  }
  *::-webkit-scrollbar-track {
    background: rgba(255,255,255,.08);
  }


  .qcw-container{
    border-radius: 0 !important;
  }

  .qcw-header {
    -webkit-flex: none;
    height: 59px;
    background-color: #eee;

    font-weight: normal;
    font-size: 16px;
    color: #000;
    padding: 12px 20px 18px 57px;
  }

  ul#messages__comments {
    background: #efe7dd url('~/static/img/bg_chat.jpg') repeat;
  }

  .isTypingText {
    bottom:14px;
  }

  .qcw-comment-form{
    top: -10px;
  }

  .qcw-room-avatar {
    max-width: 40px;
    max-height: 40px;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 9px;
    transform: translateY(-50%);
  }



</style>

