import axios from 'axios';

// 统一请求路径前缀
let base = globalConfig.httpConfig.dahuaApi;

//获取Token
export const getToken = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      ret = ret.substring(0, ret.length - 1);
      return ret;
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': ''
    },
  });
};

//获取公钥
export const getPublicKey = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}?t=${new Date().getTime()}`,
    headers: {
      'Authorization': ''
    },
  });
};