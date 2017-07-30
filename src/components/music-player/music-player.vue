<template>
    <div v-show="playlist.length>0" class="musicplayer-wrapper">
        <audio autoplay :src="songurl"></audio>
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
                    <div class="cd">
                        <img :src="activeSong.album.picUrl" alt="">
                    </div>
                </div>
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
                       <span class="icon-play"></span>
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
        <div v-show="!isfull" class="smallplayer">
            <div class="sm-cd">
                <img :src="activeSong.album.picUrl" alt="">
            </div>
            <div class="song-info">
                <div class="song-name">{{ activeSong.name }}</div>
                <div class="singer-name">{{ activeSong.artists[0].name }}</div>
            </div>
            <div class="song-play">
                <span class="icon-play"></span>
            </div>
            <div class="song-list">
                <span class="icon-playlist"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default{
  computed: {
    ...mapGetters([
      'isfull',
      'playlist',
      'activeSong'
    ]),
    songurl () {
      return `http://ws.stream.qqmusic.qq.com/${this.activeSong.qqinfo.songid}.m4a?fromtag=46`
    }
  },
  methods: {
    back () {
      this.setfull(false)
    },
    ...mapMutations({
      'setfull': 'SET_ISFULL'
    })
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
     top:120px
     bottom:150px
     width:100%
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
</style>