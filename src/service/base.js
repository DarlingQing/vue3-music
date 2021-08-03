// 对axios进行封装
import axios from 'axios'

const ERR_OK = 0
const baseURL = '/'

axios.default.baseURL = baseURL

export function get(url, params) {
  return axios.get(url, {
    params
  }).then((res) => {
    const { data } = res
    if (data.code === ERR_OK) {
      return data.result
    }
  }).catch((e) => {
    console.log(e)
  })
}
