<template>
    <div @click="changeProgress" ref="progressbar" class="progress-bar">
        <div ref="bar" class="bar"></div>
        <div ref="dot" class="dot"></div>
    </div>
</template>
<script>
    export default{
      props: {
        percents: {
          type: Number,
          default: 0
        }
      },
      watch: {
        percents (p) {
          if (p >= 0) {
            let totalwidth = this.$refs.progressbar.clientWidth
            let offset = p * totalwidth
            this.$refs.bar.style.width = `${offset}px`
            this.$refs.dot.style.left = `${offset}px`
          }
        }
      },
      methods: {
        changeProgress (e) {
          let totalwidth = this.$refs.progressbar.clientWidth
          let offset = e.offsetX
          this.$refs.bar.style.width = `${offset}px`
          this.$refs.dot.style.left = `${offset}px`
          let p = offset / totalwidth
          this.$emit('changeProgress', p)
        }
      }
    }
</script>
<style lang="stylus">
  .progress-bar
   height:3px
   position:relative
   top:6px
   background-color:rgba(0,0,0,.3)
   .bar
    position:absolute
    height:100%
    background-color:#d33a31
   .dot
    position:absolute
    top:-7px
    height:12px
    width:12px
    border:3px solid #fff
    border-radius:50%
    background-color:#d33a31 
</style>