<template>
    <div>{{ranks}}</div>
</template>
<script>
import { getHotranks } from 'api/rank'
export default{
  data () {
    return {
      ranks: []
    }
  },
  created () {
    this._getHotranks()
  },
  methods: {
    _getHotranks () {
      getHotranks().then((res) => {
        console.log(res.data)
        this.ranks = res.data
      })
    }
  }
}
</script>
<style lang="stylus">
    
</style>