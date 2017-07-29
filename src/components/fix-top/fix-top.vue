<template>
    <div class="fixtop-wrapper">
        <div class="left-navicon icon-menu"></div>
        <div class="logo"><span class="icon-music2"></span></div>
        <div class="logo-text">我的云音乐</div>
        <div class="right-searchicon icon-search"></div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus">
   #app
    .fixtop-wrapper
     position: relative
     height: 50px
     text-align: center
     background-color: #d43c33
     font-size: 0px
     color: #fff
     .left-navicon     
      position: absolute
      left:10px
      top:15px
      height:30px
      width:30px
      font-size:18px
     .right-searchicon
      position:absolute
      right: 10px
      top: 15px
      height:30px
      width:30px 
      font-size:18px
     .logo
      display: inline-block
      height: 36px
      width: 36px
      vertical-align:middle
      font-size:23px         
     .logo-text
      display:inline-block
      font-size:18px 
      line-height:50px
</style>