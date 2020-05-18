/**
 * APP应用配置
 */
const config = {
  // App发布版本
  version: '1.0.0',
  // 环境配置
  // env: 'production',
  env: 'test',
  development: {
    appId: 'wx65600876d6ec101e',
    appName: '楼促会',
    baseURL: 'http://yapi.ibuycoinamc.com/mock/17',
    h5Url: 'http://192.168.8.103:13000',
  },
  debug: {
    appId: 'wx65600876d6ec101e',
    appName: '楼促会',
    baseURL: 'https://agenttest.ibuycoinamc.com',
  },
  test: {
    appId: 'wx65600876d6ec101e',
    appName: '楼促会',
    baseURL: 'https://house.sipsea.cn/api',
  },
  production: {
    appId: 'wx65600876d6ec101e',
    appName: '楼促会',
    baseURL: 'https://house.sipsea.cn/api',
  },

  platformType: 3,
  // 是否强制授权
  isMustAuth: true,
};

export default {
  platformType: config.platformType,
  env: config.env,
  isMustAuth: config.isMustAuth,
  ...config[config.env],
  version: config.version,
};
