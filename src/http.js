import axios from 'axios'

axios.defaults.baseURL = `http://127.0.0.1:8086`

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.url === 'login' || config.url === 'homes/swipe') {
    return config;
  } else {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config;
  }
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 处理响应的数据 返回res.data 省略发请求时 const { data:{data, meta: { status, msg } }}
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios
