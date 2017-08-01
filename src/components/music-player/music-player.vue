<template>
    <div v-show="playlist.length>0" class="musicplayer-wrapper">
        <audio ref="audio" :src="songurl"></audio>
        <transition name="full">
         <div v-show="isfull" class="fullplayer">
            <div class="bg">
                <img :src="activeSong.album.blurPicUrl" alt="">
            </div>
            <div class="player-top">
                <div @click="back()" class="back">
                    <span class="icon-back"></span>
                </div>
                <div class="title">
                    <div class="song-name">{{ activeSong.name }}</div>
                    <div class="singer-name">{{ activeSong.artists[0].name }}</div>
                </div>
            </div>
            <div class="player-body">
                <div class="cd-wrapper">
                    <div class="cd" :class="isrotate">
                        <img :src="activeSong.album.picUrl" alt="">
                    </div>
                </div>
                <scroll class="lyric-scroll" ref="lyricList" :data="lrc && lrc.lines">        
                <div class="lyric-wrapper">
                    <div v-if="lrc">
                    <p  ref="lyricLine"
                        class="text"
                        :class="{'current': currentLineNum ===index}"
                        v-for="(line,index) in lrc.lines">{{line.txt}}</p>
                    </div>
                </div>
                </scroll>
            </div>
            <div class="player-footer">
               <div class="actions">
                   <div class="icon-action">
                       <span class="icon-sequence"></span>
                   </div>
                   <div class="icon-action">
                       <span class="icon-prev"></span>
                   </div>
                   <div class="icon-action">
                       <span @click="tooglePlay" :class="playicon"></span>
                   </div>
                   <div class="icon-action">
                       <span class="icon-next"></span>
                   </div>
                   <div class="icon-action">
                       <span class="icon-not-favorite"></span>
                   </div>
               </div>
            </div>
         </div>        
        </transition>
       <transition name="small">
          <div v-show="!isfull" class="smallplayer" @click="full()">
            <div class="sm-cd">
                <img :src="activeSong.album.picUrl" alt="">
            </div>
            <div class="song-info">
                <div class="song-name">{{ activeSong.name }}</div>
                <div class="singer-name">{{ activeSong.artists[0].name }}</div>
            </div>
            <div class="song-play">
                <span @click.stop="tooglePlay" :class="playicon"></span>
            </div>
            <div class="song-list">
                <span class="icon-playlist"></span>
            </div>
        </div>
       </transition>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Lyric from 'lyric-parser'
import { getLrc } from 'api/song'
import Scroll from 'base/scroll/scroll'
export default{
  data () {
    return {
      lrc: null,
      playingLyric: '',
      currentLineNum: 0
    }
  },
  components: {
    Scroll
  },
  computed: {
    ...mapGetters([
      'isfull',
      'playlist',
      'activeSong',
      'isplaying'
    ]),
    songurl () {
      return `http://ws.stream.qqmusic.qq.com/${this.activeSong.qqinfo.songid}.m4a?fromtag=46`
    },
    playicon () {
      return this.isplaying ? 'icon-pause' : 'icon-play'
    },
    isrotate () {
      return this.isplaying ? 'play' : 'play pause'
    }
  },
  methods: {
    back () {
      this.setfull(false)
    },
    full () {
      this.setfull(true)
    },
    tooglePlay () {
      this.setisplaying(!this.isplaying)
      this.lrc.togglePlay()
    },
    getLrc (id) {
      getLrc(id).then((res) => {
        let lyric = res.data
        this.lrc = new Lyric(lyric, this.handleLyric)
        this.lrc.play()
      })
    },
    handleLyric ({lineNum, txt}) {
      if (!this.$refs.lyricLine) {
        return
      }
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    ...mapMutations({
      'setfull': 'SET_ISFULL',
      'setisplaying': 'SET_ISPLAYING'
    })
  },
  watch: {
    activeSong () {
      this.$nextTick(() => {
        this.$refs.audio.play()
        this.getLrc(this.activeSong.qqinfo.songid)
      })
    },
    isplaying (newplay) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newplay ? audio.play() : audio.pause()
      })
    }
  }
}
</script>
<style lang="stylus">
 @import '../../common/stylus/mixin/mixin.styl';
   .fullplayer
    position:fixed
    top:0
    right:0
    bottom:0
    left:0
    z-index:99
    background-color:#666
    &.full-enter-active,&.full-leave-active
     transition:all .4s
     .player-top,.player-footer
      transition:all .4s linear
    &.full-enter,&.full-leave-to
     opacity:0
     .player-top
      transform:translate3d(0,-100px,0)
     .player-footer
      transform:translate3d(0,100px,0)   
    .bg
     position:absolute
     top:0
     left:0
     width:100%
     height:100%
     filter:blur(20px)
     z-index:-1 
     &:after
      position:absolute
      z-index:3
      left:0
      top:0
      content:''
      width:100%
      height:100%
      background-color:rgba(0,0,0,0.2)
     img
      height:100%
      width:100%      
    .player-top
     height:100px
     color:#fff
     text-align:center    
     .back
      position:absolute
      top:5px
      left:10px
      transform:rotateZ(-90deg)
      font-size:20px
      color:#d33a31
     .song-name
      padding:10px 0
     .singer-name
      font-size:13px 
    .player-body
     position:fixed
     top:80px
     bottom:150px
     width:100%      
     .lyric-scroll
      position: absolute
      left:0
      top:0
      width:100%
      height:100%
      text-align:center
      overflow:hidden      
      .text
       color:#666
       &.current
        color:red
     .cd-wrapper
      width:100%
      text-align:center
      padding-top:70%
      position:relative
      .cd
       width:70%
       position:absolute
       left:15%
       top:0
       height:100%
       background-image:url('./cd.png')
       background-size:cover
       border-radius:50%
       &.play
        animation: rotate 20s linear infinite
       &.pause
        animation-play-state: paused  
       img
        height:70%
        width:70%
        border-radius:50%  
        margin:15% auto
    .player-footer
     position:fixed
     bottom:40px
     left:0
     width:100%
     .actions
      display:flex
      .icon-action
       color:#d33a31
       flex:1
       text-align:center
       font-size:28px
   .smallplayer    
    position:fixed
    bottom:0
    left:0
    width:100%
    background-color:#fff
    height:50px
    display:flex
    border-top(2px,#d33a31)    
    &.small-enter-active,&.small-leave-active
     transition:all .6s    
    &.small-enter,&.small-leave-to
     opacity:0
     transform:translateY(100px)
    .sm-cd
     flex: 0 0 50px    
     img
      width:80%
      height:80%
      border-radius:50%
      margin: 5px 0 0 5px
    .song-info
     flex:3
     padding: 8px 0 0 5px
    .song-name
     color:#333
    .singer-name
     color:#aaa
     font-size:13px 
    .song-play
     flex:1
     text-align:center
     line-height:50px
     font-size:23px
     color:#666
    .song-list
     flex:1
     text-align:center
     line-height:50px
     font-size:23px
     color:#666

@keyframes rotate
 0%
  transform: rotate(0)
 100%
  transform: rotate(360deg)         
</style>