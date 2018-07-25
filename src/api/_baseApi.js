import axios from 'axios'

class Http {
  init (token) {
    const http = axios.create({
      // baseURL: process.env.API_HOST,
      baseURL: 'http://127.0.0.1:3099/',
      // baseURL: 'https://api.calibur.tv/',
      headers: { Accept: 'application/x.api.latest+json' },
      timeout: 10000
    })

    http.interceptors.request.use(config => {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
        Test: Date.now()
      })
      return config
    })

    http.interceptors.response.use(res => res.data.data, err => {
      if (err.message === `timeout of 10000ms exceeded`) {
        return Promise.reject('网路请求超时，请稍候再试！')
      }
      try {
        if (!err.response) {
          return Promise.reject('网络错误，请刷新网页重试！')
        }
        let message = err.response.data.message
        if (typeof message === 'string') {
          return Promise.reject(message)
        }
        return Promise.reject(message[Object.keys(message)[0]][0])
      } catch (e) {
        console.error(e.message)
      }
    })

    this.http = http
  }

  get (url, data) {
    return this.http.get(url, {
      params: data
    })
  }

  post (url, params) {
    return this.http.post(url, params)
  }
}

export default new Http()
