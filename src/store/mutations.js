import * as types from './mutations-type'

const mutations = {
  [types.SET_SONGLIST] (state, songlist) {
    state.songlist = songlist
  }
}

export default mutations
