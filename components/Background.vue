<template>
  <div id="wrapper"></div>
</template>

<style>
  #wrapper {
    position: fixed;
    display: block;
    overflow: auto;
    background: #DFDFDF linear-gradient(to bottom, #DDDBD1, #D2DBDC);
  }

  #wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }

  #wrapper::before {
    position: absolute;
    z-index: -1;
    background-color: #f4eb2c;
    width: 100%;
    height: 222px;
    content: "";
    top: 0px;
    left: 0px;
  }

</style>
