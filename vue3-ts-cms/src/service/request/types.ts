import type { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse } from 'axios'
// 封装过程中遇到问题
// axios更新1.3.14版本 requestSuccessFn(config), config的类型不能为AxiosRequestConfig，
// 应为InternalAxiosRequestConfig。

// 用于实例化
interface YSInterceptors {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: AxiosResponse) => AxiosResponse
  responseFailureFn?: (err: any) => any
}
export interface YSRequestConfig extends AxiosRequestConfig {
  interceptors?: YSInterceptors
}

// 用于request方法
interface YSInterceptors2<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}
export interface YSRequestConfig2<T> extends AxiosRequestConfig {
  interceptors?: YSInterceptors2<T>
}
