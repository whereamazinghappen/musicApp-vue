<template>
    <div>热门推荐</div>
</template>
<script>
    import { getRecommends } from 'api/discover'
    export default {
      created () {
        this._getRecoommeds()
      },
      methods: {
        _getRecoommeds () {
          getRecommends().then((res) => {
            if (res.data.code === 200) {
              console.log(res)
            }
          })
        }
      }
    }
</script>
<style lang="stylus">
    
</style>