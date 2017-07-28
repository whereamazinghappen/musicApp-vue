<template>
    <div class="playlist-wrapper">
        <scroll class="playlist-content" :data="Playlists">
            <div>
            <div class="playlist-all">
                <ul>
                    <li @click="detail(item)" class="playlist-li" v-for="item in Playlists">
                        <div class="playlist-li-image">
                            <img v-lazy="item.image" alt="歌单">
                        </div>
                        <div class="playlist-li-desc">{{ item.name.trim() }}</div>
                    </li>
                </ul>
            </div>
            </div>
        </scroll>
      <div v-show="!Playlists.length" class="loading-wrapper">
        <loading></loading>    
      </div>
    <transition name="slide">
        <router-view></router-view>
    </transition>   
    </div>
</template>
<script>
    import { getPlaylists } from 'api/songslist'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    import { mapMutations } from 'vuex'

    export default{
      components: {
        Scroll,
        Loading
      },
      data () {
        return {
          Playlists: []
        }
      },
      created () {
        this._getPlaylists()
      },
      methods: {
        _getPlaylists () {
          getPlaylists().then((res) => {
            this.Playlists = res.data
          })
        },
        detail (item) {
          this.setSonglist(item)
          let id = item.href.split('=')[1]
          this.$router.push(`/songlist/${id}`)
        },
        ...mapMutations({
          setSonglist: 'SET_SONGLIST'
        })
      }
    }
</script>
<style lang="stylus">
  .playlist-wrapper
   position:fixed
   top:90px
   bottom:0
   width:100%
   .playlist-content
    height:100%
    overflow:hidden
   ul
    margin:0
   .loading-wrapper
     position:absolute
     top:50%
     width:100%
     transform:translateY(-50%) 
   .playlist-li
    display:flex
    height:60px
    padding: 12px 0 0 10px
    .playlist-li-image
     flex:0 0 60px
     img
      width:100%
      height:100%
      border-radius:50%
    .playlist-li-desc
     flex:1 1 auto
     display:flex
     align-items:center
     padding:0px 5px 0 10px

   .slide-enter-active, .slide-leave-active
     transition: all 0.3s
   .slide-enter, .slide-leave-to
     transform: translate3d(100%, 0, 0)
</style>