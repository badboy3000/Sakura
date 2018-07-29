import Vue from 'vue'
import md5 from 'vendor/md5'
import { APP_HTTP_SECRET_KEY, env } from 'env'
const baseURL = process.env.API_HOST

const convertGetQuery = (params) => {
  const result = {}
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      result[key] = params[key].toString()
    }
  })
  return result;
}

class Http {
  init () {
    this.timeout = 10
    const timer = setInterval(async () => {
      if (cordova && cordova.plugin && cordova.plugin.http) {
        clearInterval(timer)
        this.http = cordova.plugin.http
        this.http.setDataSerializer('json');
        this.http.setHeader('Accept', 'application/x.api.v1+json');
        this.http.setHeader('Content-Type', 'application/json');
        this.http.setHeader('Authorization', `Bearer ${Vue.prototype.$cache.get('JWT-TOKEN')}`);
        if (env !== 'production') {
          Vue.prototype.$channel.$emit('request-module-init-success')
          return
        }
        const promise1 = new Promise((resolve, reject) => {
          this.http.enableSSLPinning(true, resolve, reject);
        })
        const promise2 = new Promise((resolve, reject) => {
          this.http.acceptAllCerts(true, resolve, reject);
        })
        try {
          await Promise.all([promise1, promise2])
          Vue.prototype.$channel.$emit('request-module-init-success')
        } catch (e) {
          Vue.prototype.$channel.$emit('request-module-init-failed')
        }
      }
    }, 250)
  }

  setToken(token) {
    this.http.setHeader('Authorization', `Bearer ${token}`);
  }

  computeAuthHeader(headers) {
    const ts = Date.now()

    return convertGetQuery(Object.assign({
      'X-Auth-Time': ts,
      'X-Auth-Value': md5(ts + APP_HTTP_SECRET_KEY)
    }, headers))
  }

  get (url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseURL}${url}`, convertGetQuery(params), this.computeAuthHeader(headers), function(res) {
        if (!res.data) {
          resolve()
        }
        try {
          resolve(JSON.parse(res.data).data)
        } catch(e) {
          reject('网络请求失败')
        }
      }, function(err) {
        try {
          const errorObj = JSON.parse(err.error)
          reject(errorObj.message)
        } catch (e) {
          reject('网络请求失败')
        }
      });
    })
  }

  post (url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.http.post(`${baseURL}${url}`, data, this.computeAuthHeader(headers), function(res) {
        if (!res.data) {
          resolve()
        }
        try {
          resolve(JSON.parse(res.data).data)
        } catch(e) {
          reject('网络请求失败')
        }
      }, function(err) {
        try {
          reject(JSON.parse(err.error).message)
        } catch (e) {
          reject('网络请求失败')
        }
      });
    })
  }
}

export default new Http()
