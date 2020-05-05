// import Toast from 'vant/lib/toast'
// import 'vant/lib/toast/style'

export default http => {
  // 请求拦截
  http.interceptors.request.use(
    config => {
      //config.withCredentials = true // 需要跨域打开此配置
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  // https://github.com/mzabriskie/axios#interceptors
  http.interceptors.response.use(
    response => {
      return response
    },
    /**
     * This is a central point to handle all
     * error messages generated by HTTP
     * requests
     */
    error => {
      if (!error['response']) {
        return Promise.reject(error)
      }
      switch (error.response.status) {
        case 400:
        case 422:
          let content = error.response.data.message
          Toast.fail(content)
          break
        case 403:
          Toast.fail(error.response.data.message || '您没有此操作权限！')
          break
        case 401:
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
          }
          break
        case 500:
        case 501:
        case 503:
        default:
          Toast.fail('服务器出了点小问题，程序员小哥哥要被扣工资了~！')
      }
      return Promise.reject(error.response)
    }
  )
}
