<template>
    <div class="nav-tab border-1px">
        <router-link tag="li" class="tab-item" to="/recommend"><span class="tab-link">热门推荐</span></router-link>
        <router-link tag="li" class="tab-item" to="/songlist"><span class="tab-link">歌单</span></router-link>
        <router-link tag="li" class="tab-item" to="/fm"><span class="tab-link">主播电台</span></router-link>
        <router-link tag="li" class="tab-item" to="/rank"><span class="tab-link">排行榜</span></router-link>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus">
    @import '../../common/stylus/mixin/mixin.styl';
    .nav-tab
     display:flex
     height:40px
     width:100%
     border-1px(rgba(0,0,0,.1))
     .tab-item
      flex:1
      height:100%
      text-align:center
      .tab-link
       padding-bottom:8px      
       color:#333
       font-size:15px
       line-height:40px
      &.router-link-active
       .tab-link
        color:#d33a31
        border-bottom: 2px solid #d33a31;     
</style>