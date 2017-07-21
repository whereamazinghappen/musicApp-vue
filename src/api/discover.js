import axios from 'axios'

export function getRecommends () {
  const url = '/api/getRecommends'
  return axios.get(url, {
  }).then((res) => {
    return Promise.resolve(res)
  })
}
