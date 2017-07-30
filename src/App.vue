<template>
  <div id="app">
    <fix-top></fix-top>
    <nav-tab></nav-tab>
      <keep-alive>
        <router-view></router-view>    
      </keep-alive>
      <music-player></music-player>
  </div>
</template>

<script>
  import FixTop from 'components/fix-top/fix-top'
  import NavTab from 'components/nav-tab/nav-tab'
  import MusicPlayer from 'components/music-player/music-player'
  export default {
    components: {
      FixTop,
      NavTab,
      MusicPlayer
    }
  }
</script>

<style lang="stylus">

</style>