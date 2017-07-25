<template>
    <div class="loading">
        <img class="loading-image" src="./loading.gif" alt="努力加载中---">
        <p class="loading-text">{{ text }}</p>
    </div>
</template>
<script>
    export default{
      props: {
        text: {
          type: String,
          default: '努力加载中---'
        }
      }
    }
</script>
<style lang="stylus">
    .loading
     text-align:center
     .loading-image
      width:30px
      height:30px
     .loading-text
      color:#333  
</style>