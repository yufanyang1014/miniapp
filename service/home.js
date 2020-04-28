import http from './http/main';

/**
 * 获取首页信息
 */
export const bannerGetByTypeApi = (params, config) => (
  http.post('/banner/getByType', params, { ...config })
);


