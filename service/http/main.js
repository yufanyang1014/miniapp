import axios from '../../miniprogram_npm/wx-axios/axios';
import config from '../../app.config';

const { baseURL } = config;

const instance = axios.create({
  baseURL,
  responseEncoding: 'utf8',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF8"
  }
});

// 拦截 request
instance.interceptors.request.use((request) => {
  return request;
}, error => Promise.reject(error));

// 拦截 response
instance.interceptors.response.use((response) => {
  // OPTIONS请求方法的用途：
  // 1. 用来获取服务器支持http的请求方式
  // 2. 用来检测服务器的性能
  if (response.config.method.toLowerCase() === 'options') return false;
  if (response.status !== 200) {
    return Promise.reject();
  }
  return Promise.resolve(response.data);

}, (error) => {
  if (error.message.indexOf('code 404') > -1) {
    alert('数据不存在');
  } else if (error.message.indexOf('timeout of') > -1) {
    alert('请求超时了');
  } else {
    alert('系统繁忙，请稍候再试！');
  }
});

export default instance;
