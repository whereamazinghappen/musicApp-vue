import axios from 'axios'
export function getPlaylists () {
  const url = '/api/getPlaylists'
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res)
  })
}
export function getPlaylistsDetail (id) {
  const url = `/api/getPlaylistsDetail?id=${id}`
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res)
  })
}
