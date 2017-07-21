<template>
  <div id="app">
    <fix-top></fix-top>
    <nav-tab></nav-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import FixTop from 'components/fix-top/fix-top'
  import NavTab from 'components/nav-tab/nav-tab'
  export default {
    components: {
      FixTop,
      NavTab
    }
  }
</script>

<style lang="stylus">

</style>