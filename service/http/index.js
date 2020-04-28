import axios from '../../miniprogram_npm/wx-axios/axios';
import config from '../../app.config';
import { humpToUnderline, underlineToHump } from '../../utils/index';

const { baseURL, version } = config;
console.log('baseURL');
console.log(baseURL);

const instance = axios.create({
  baseURL,
});

if (config.env === 'development') {
  instance.interceptors.request.use(request => request);
  instance.interceptors.response.use((response) => {
    /* eslint-disable no-console */
    console.log(`请求${response.config.url.replace(new RegExp(response.config.baseURL), '')}返回的Mock数据:`);
    console.dir(response.data);
    return response;
  });
}

// 拦截器
instance.interceptors.request.use((request) => {
  const token = JSON.parse(wx.getStorageSync('token') || '""');
  /* eslint-disable */
  request.params = request.params || {};
  request.params.access_token = token;
  request.data = request.data || {};
  request.withCredentials = true;
  request.headers.common['version'] = version;
  request.data.platform = config.platformType;
  /* eslint-enable */
  // request.headers.common['XAuthToken'] = token

  if (request.method && request.method.toLowerCase() === 'post') {
    if ((request.data instanceof Object) && typeof request.data !== 'object') {
    // if ((request.data instanceof FormData) && typeof request.data !== 'object') {
      request.data.append('access_token', token);
    } else {
      /* eslint-disable */
      request.data.access_token = token;
      request.data = humpToUnderline(request.data)
      /* eslint-enable */
    }
  }
  return request;
}, error => Promise.reject(error));


instance.interceptors.response.use((response) => {
  const token = JSON.parse(wx.getStorageSync('token') || '""');
  // 阻止options
  if (response.config.method.toLowerCase() === 'options') return false;
  if (response.statusCode !== 200) {
    return Promise.reject();
  }
  // 处理格式异常
  /* eslint-disable no-param-reassign */
  if (response.data.data === '{}') {
    response.data.data = JSON.parse(response.data.data);
  } else if ((response.data.data instanceof Array && response.data.data.length === 0) || response.data.data === '' || response.data.data === undefined) {
    response.data.data = {};
  }
  response.data.data = underlineToHump(response.data.data);

  /* eslint-enable */
  // access_token超时(41002)
  // 缺少access_token参数(41001)
  // 不存在用户,请注册后再进行登录(10022)
  // 当前商品需登录才能查看 (23021)
  if ([10022, 41001, 41002, 23021].some(code => code === response.data.code)) {
    const meta = response.config.meta || {};
    // 无需登录
    if (meta.auth === 0) {
      return Promise.resolve(response.data);
    }
    // 不跳转登录（解决10022状态码冲突）
    if (response.data.code === 10022 && !token) {
      return Promise.resolve(response.data);
    }
    // 重新登录
    if (response.data.code === 41002) {
      wx.showToast({
        icon: 'clear',
        title: '登录失效，请重新登录！',
        duration: 1500,
      });
    }
    wx.removeStorageSync('token');
    wx.navigateTo({
      url: '/pages/user/login/login',
    });
  } else {
    return Promise.resolve(response.data);
  }

  return Promise.reject(response.data);
}, (error) => {
  if (!error) {
    console.log(error);
    wx.showToast({
      icon: 'clear',
      title: '系统繁忙，请稍候再试！',
      duration: 1500,
    });
    return Promise.reject(error);
  } if (error.message.indexOf('code 404') > -1) {
    wx.showToast({
      icon: 'clear',
      title: '数据不存在',
      duration: 1500,
    });
  } else if (error.message.indexOf('timeout of') > -1) {
    const errorData = { msg: '请求超时了' };
    wx.showToast({
      icon: 'clear',
      title: '请求超时了',
      duration: 1500,
    });
    return Promise.reject(errorData);
  } else {
    wx.showToast({
      icon: 'clear',
      title: '系统繁忙，请稍候再试！',
      duration: 1500,
    });
  }
  return Promise.reject(error);
});

export default instance;
