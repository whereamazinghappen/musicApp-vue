<template>
    <div class="detail-wrapper">
        <div @click="back" class="back"><span class="icon-back"></span></div>
        <div class="bg-wrapper" :style="bgstyle">
        </div>
        <div class="soogsgrounp-desc">
            <div class="songsgroup-img">
                <img :src="songlist.image" alt="">
                <span class="count">{{ songlist.count }}</span>
                <span class="text">歌单</span>
            </div>
        <div class="songsgroup-info">
            {{ songlist.name }}
        </div>
        </div>
        <div class="songs-wrapper">
            <div class="songs-title">歌曲列表</div>
            <scroll class="allsongs" :data="songs">
                <div>
                    <div class="song-items">
                        <ul>
                            <li class="one-song" v-for="(item,index) in songs">
                                <div class="song-num">{{ index+1 }}</div>
                                <div class="song-info">
                                    <div class="song-name">{{ formateName(item) }}</div>
                                    <div class="song-ar">{{ formateDesc(item) }}</div>
                                </div>
                                <div class="song-action"><span class="icon-play2"></span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
            <div v-show="!songs.length" class="loading-wrapper">
              <loading></loading>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import { getPlaylistsDetail } from 'api/songslist'
    export default{
      data () {
        return {
          songs: []
        }
      },
      components: {
        Scroll,
        Loading
      },
      created () {
        console.log(this.songlist)
        if (!this.songlist.href) {
          this.$router.push('/songlist')
        } else {
          let id = this.songlist.href.split('=')[1]
          getPlaylistsDetail(id).then((res) => {
            this.songs = res.data
          })
        }
      },
      methods: {
        formateName (item) {
          let alia = item.alias[0] ? `(${item.alias[0]})` : ''
          return item.name + alia
        },
        formateDesc (item) {
          let desc = item.artists[0].name + '-' + item.album.name
          return desc
        },
        back () {
          this.$router.back()
        }
      },
      computed: {
        bgstyle () {
          return `background-image:url(${this.songlist.image})`
        },
        ...mapGetters([
          'songlist'
        ])
      }
    }
</script>
<style lang="stylus">
    .detail-wrapper
     position:fixed
     width:100%
     height:100%
     top:0
     right:0
     bottom:0
     left:0
     background-color:#f8f8f8
     .back
      position:absolute
      top:0
      right:0
      transform:rotateZ(180deg)
      font-size:20px
      padding:0 0 5px 5px
      z-index:1
      color:#d43b32
     .bg-wrapper
      height:150px
      background-size: cover
      background-position: 50%
      filter: blur(12px)
      transform: scale(1.5)
     .soogsgrounp-desc
      position:absolute
      display:flex
      box-sizing:border-box
      top:0
      left:0
      width:100%
      padding:20px
      color:#fff
      .songsgroup-img
       flex: 0 0 130px
       position:relative
       img
        width:140px
        height:140px
       .text
        position:absolute
        left:0
        top:20px
        background-color:#d43b32
        border-radius: 0 10px 10px 0
        font-size:13px
        padding: 2px 5px
       .count
        position:absolute
        top:0
        right:0
        font-size:12px
        z-index:10
        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PGcgb3BhY2l0eT0iLjE1Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNDAwMDAiIGQ9Im0yMiAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvZz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiIGQ9Im0yMCAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvc3ZnPg==")
        background-repeat:no-repeat
        padding:2px 2px 0px 18px
        background-size:12px
        background-position:0
       &:after
        background-image: linear-gradient(90deg,transparent,rgba(0,0,0,.2))
        position:absolute
        content:''
        height:18px
        width:100%
        top:0
      .songsgroup-info
       flex: 1 1 auto
       padding-left:20px
       display:flex
       align-items:center
     .songs-wrapper
      position:fixed
      top:180px
      left:0
      width:100%
      bottom:0
      overflow:hidden
      background-color:#f8f8f8
      .allsongs
       height:100%
       overflow:hidden
       .song-items
        padding-bottom:40px
      .songs-title
       background-color:#eeeff0
       color:#666
       padding-left:10px
       margin:10px 0
      .one-song
       height:50px
       display:flex
       .song-num
        flex: 0 0 30px
        line-height:50px
        padding-left:12px
       .song-info
        flex: 1 1 auto
        display:flex
        flex-direction:column
        justify-content:center
        width:0
        .song-name
         overflow:hidden
         text-overflow:ellipsis
         white-space:nowrap
        .song-ar
         font-size:13px
         color:#888
         overflow:hidden
         text-overflow:ellipsis
         white-space:nowrap
       .song-action
        flex: 0 0 50px
        line-height:50px
        text-align:center
        color:#aaa
        font-size:20px    
</style>