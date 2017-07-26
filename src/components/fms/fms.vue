<template>
    <div>
        <div v-show="!fms.length" class="loading-wrapper">
            <loading text="节目加载中---"></loading>
        </div>
    </div>
</template>
<script>
    import Loading from 'base/loading/loading'
    export default {
      components: {
        Loading
      },
      data () {
        return {
          fms: []
        }
      }
    }
</script>
<style lang="stylus">
    
</style>