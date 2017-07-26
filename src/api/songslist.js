import axios from 'axios'
export function getPlaylists () {
  const url = '/api/getPlaylists'
  return axios.get(url, {}).then((res) => {
    console.log(res)
    return Promise.resolve(res)
  })
}
