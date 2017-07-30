import * as types from './mutations-type'
export const playmusic = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_ACTIVEINDEX, index)
  commit(types.SET_ISPLAYING, true)
  commit(types.SET_ISFULL, true)
}
