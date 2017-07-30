export const songlist = state => state.songlist
export const isplaying = state => state.isplaying
export const isfull = state => state.isfull
export const playlist = state => state.playlist
export const playMode = state => state.playMode
export const activeIndex = state => state.activeIndex
export const activeSong = (state) => {
  return state.playlist[state.activeIndex]
}
