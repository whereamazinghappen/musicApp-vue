<template>
    <div>热门推荐</div>
</template>
<script>
    import { getRecommends, getNewSongs } from 'api/discover'
    export default {
      created () {
        this._getRecoommeds()
        this._getNewSongs()
      },
      methods: {
        _getRecoommeds () {
          getRecommends().then((res) => {
            if (res.data.code === 200) {
              console.log(res)
            }
          })
        },
        _getNewSongs () {
          getNewSongs().then((res) => {
            console.log(res)
          })
        }
      }
    }
</script>
<style lang="stylus">
    
</style>