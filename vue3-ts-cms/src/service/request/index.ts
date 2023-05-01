import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YSRequestConfig, YSRequestConfig2 } from './types'

/*
    全局拦截器，实例拦截器，单次请求拦截器
    返回响应的结果（泛型）
*/

class YSRequest {
  // instance实例->axios实例
  instance: AxiosInstance
  constructor(config: YSRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的单个实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网路请求方法
  request<T = any>(config: YSRequestConfig2<T>) {
    // 单次请求
    if (config.interceptors?.requestSuccessFn) {
      // ？？？？？？？？？？？？？？？？？
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: YSRequestConfig2<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: YSRequestConfig2<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: YSRequestConfig2<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: YSRequestConfig2<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default YSRequest
