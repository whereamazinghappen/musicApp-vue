import axios from 'axios'
export function getLrc (id) {
  return axios.get(`/api/getLrc?id=${id}`).then((res) => {
    return Promise.resolve(res)
  })
}
