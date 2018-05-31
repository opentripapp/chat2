<template>
<div class="intro pane-body">
  <div class="intro-body">
      <div class="intro-image" style="transform: scale(1);opacity: 1;"></div>
      <div class="intro-text-container" style="opacity: 1;transform: translateY(0px);">
        <h1 class="intro-title">Welcome to OpenTrip Web Chat</h1>
      </div>
    <div class="intro-text">
      Opentrip Web Chat helps make it easy for you to discuss your trips through the browser. select a contact to start the conversation
    </div>
  </div>
</div>
</template>

<style>
  .intro-text{
    font-size: 14px;
    color: #929fa6;
    line-height: 20px;
  }
  .intro .intro-title {
    color: #4b5961;
    font-size: 36px;
    font-weight: normal;
  }
  .intro {
    height: 100%;
    background-color: #f7f9fa;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    box-sizing: border-box;
    border-left: 1px solid rgba(0,0,0,0.08);
    position: relative;
    padding-bottom: 28px;
    padding-top: 28px;
    cursor: default;
  }
  .pane-body {
    -webkit-flex-grow: 1;
    flex-grow: 1;
    z-index: 1;
  }
  .intro .intro-body {
    text-align: center;
    margin-top: -20px;
    max-width: 460px;
    width: 80%;
  }
  .intro .intro-image {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    -webkit-transform-origin: center;
    transform-origin: center;
    opacity: 0;
    background-repeat: no-repeat;
    background-size: contain;
    transition: height .3s ease;
  }
  .intro-image {
    background-image: url('~/static/img/opentrip-round.png');
  }
</style>
