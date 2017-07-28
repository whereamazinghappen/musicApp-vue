<template>
    <div class="hotranks-wrapper">
      <scroll :data="ranks" class="ranks-content">
        <div>
            <div class="hot-bg">热歌榜<span class="hot_time">{{ updateTime | formateDate }}</span></div>
            <div class="hot-list">
              <ul>
                <li class="hot-li" v-for="(item,index) in ranks">
                  <div :class="{red:index<3}" class="hot-level">{{ index+1 }}</div>
                  <div class="hot-item border-1px">
                    <div class="hot-name">{{ formateName(item) }}</div>
                    <div class="hot-ar hot-al">{{ formateDesc(item) }}</div>
                  </div>
                  <div class="hot-action border-1px"><span class="icon-play2"></span></div>
                </li>
              </ul>
            </div>
        </div>
      </scroll>
      <div v-show="!ranks.length" class="loading-wrapper">
        <loading></loading>
      </div>
    </div>
</template>
<script>
import { getHotranks } from 'api/rank'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default{
  components: {
    Scroll,
    Loading
  },
  data () {
    return {
      ranks: [],
      updateTime: 0
    }
  },
  created () {
    this._getHotranks()
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
    }
  },
  methods: {
    _getHotranks () {
      getHotranks().then((res) => {
        console.log(res.data)
        this.ranks = res.data.tracks
        this.updateTime = res.data.updatetime
      })
    },
    formateName (item) {
      let alia = item.alia[0] ? `(${item.alia[0]})` : ''
      return item.name + alia
    },
    formateDesc (item) {
      let desc = item.ar[0].name + '-' + item.al.name
      return desc
    }
  }
}
</script>
<style lang="stylus">
 @import '../../common/stylus/mixin/mixin.styl';
    .hotranks-wrapper
     position:fixed
     top:90px
     bottom:0
     width:100%
     .loading-wrapper
      position:absolute
      width:100%
      top:50%
      width:100%
      transform:translateY(-50%) 
     .ranks-content
      height:100%
      overflow:hidden
      .hot-bg
       height:120px
       background-image:url('./hot_music_bg.jpg')
       background-size:cover 
       color:#fff
       font-family: cursive
       font-size:38px
       line-height:120px
       text-align:center
       .hot_time
        font-size:18px
      .hot-li
       display:flex
       height:50px       
       .hot-level
        flex:0 0 30px
        line-height:50px
        padding-left:12px
        &.red
         color:red
       .hot-item
        flex: 1 1 auto
        width:0
        display:flex
        flex-direction:column
        justify-content: space-around
        border-1px(rgba(0,0,0,.1))
        .hot-name
         overflow:hidden
         text-overflow:ellipsis
         white-space:nowrap
        .hot-ar.hot-al
         font-size:13px
         color:#888 
       .hot-action
        flex: 0 0 50px
        line-height:50px
        color:#aaa
        font-size:20px
        text-align:center 
        border-1px(rgba(0,0,0,.1))       
</style>