import * as types from './mutations-type'

const mutations = {
  [types.SET_SONGLIST] (state, songlist) {
    state.songlist = songlist
  },
  [types.SET_ISPLAYING] (state, isplaying) {
    state.isplaying = isplaying
  },
  [types.SET_ISFULL] (state, isfull) {
    state.isfull = isfull
  },
  [types.SET_PLAYLIST] (state, playlist) {
    state.playlist = playlist
  },
  [types.SET_PLAYMODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.SET_ACTIVEINDEX] (state, activeIndex) {
    state.activeIndex = activeIndex
  }
}

export default mutations
