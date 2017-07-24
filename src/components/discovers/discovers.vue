<template>
    <div class="discover-warppper">
        <div class="remdsongs-warpper">
            <h2>推荐歌单</h2>
            <div v-if="recommeds.length" class="remd-ul">
                <ul>
                    <li :class="{'padding-right-0px':!((index+1)%3)}" class="remd-li" v-for="(item,index) in recommeds">
                        <a :href="item.href" class="remd-a">
                            <div class="remd-img">
                                <img :src="item.image" alt="item.name">
                                <span class="count">{{ item.count }}</span>
                            </div>
                            <p class="remd-text">{{item.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="newsongs-warpper">
            <h2>最新音乐</h2>
            <div v-if="newsongs.length" class="new-ul">
                <ul>
                    <li class="newsong-li" v-for="item in newsongs">
                        <div class="songname">{{ item.name }}</div>
                        <div class="songinfo">{{ item.song.artists[0].name+'-'+item.song.album.name }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { getRecommends, getNewSongs } from 'api/discover'
    export default {
      data () {
        return {
          recommeds: [],
          newsongs: []
        }
      },
      created () {
        this._getRecoommeds()
        this._getNewSongs()
      },
      methods: {
        _getRecoommeds () {
          getRecommends().then((res) => {
            if (res.status === 200) {
              this.recommeds = res.data
            }
          })
        },
        _getNewSongs () {
          getNewSongs().then((res) => {
            if (res.status === 200) {
              this.newsongs = res.data.result
            }
          })
        }
      }
    }
</script>
<style lang="stylus">
 @import '../../common/stylus/mixin/mixin.styl';
    .discover-warppper
     h2
      height:20px
      font-size:17px
      color:#333
      padding-left:10px
      border-left(2px,#d33a31)
     ul
      overflow:hidden
      &:after
       content:""
       clear:both
     .remd-li
      &.padding-right-0px
       padding-right:0
      width:33.3%
      float:left
      padding-right:2px
      padding-bottom:15px
      box-sizing:border-box
      .remd-img
       position:relative
       &:after
        content:''
        position:absolute
        left:0
        top:0
        width:100%
        height:20px
        background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent)
       .count
        position:absolute
        right:0
        top:0
        padding-left:13px
        text-shadow: 1px 0 0 rgba(0,0,0,.15)
        color:#fff
        font-size:12px
        z-index:9
        background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PGcgb3BhY2l0eT0iLjE1Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNDAwMDAiIGQ9Im0yMiAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvZz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiIGQ9Im0yMCAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvc3ZnPg==")
        background-position: 0
        background-repeat: no-repeat
        background-size: 11px 10px
      img
       width:100%
      .remd-text
       display: -webkit-box
       -webkit-line-clamp:2
       -webkit-box-orient:vertical
       overflow:hidden
       padding:6px 2px 0 6px
       margin:0
       line-height:1.2
       font-size:13px
</style>