import axios from 'axios'
export function getHotranks () {
  const url = '/api/getHotranks'
  return axios.get(url, {}).then((res) => {
    return Promise.resolve(res)
  })
}
