import axios from 'axios'
import interceptors from './interceptors'

// allow use http client without Vue instance
const http = axios.create({
  baseURL: 'http://119.3.248.197:8084/api',
  timeout: 30000
})

interceptors(http)

/**
 * Helper method to set the header with the token
 */
export function setToken(token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

http.defaults.headers['Accept'] = 'application/json'

export default http
