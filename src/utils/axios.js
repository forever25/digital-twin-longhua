// axios封装工具
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store';
import {
  Message
} from 'view-design';

Vue.use(Vuex)

// 统一请求路径前缀
let base = globalConfig.httpConfig.baseApi;
// 超时设定
axios.defaults.timeout = globalConfig.httpConfig.timeOut;

/**
 * 请求拦截器
 * @param config - 请求前的控制
 * @param error - 出现错误的时候会提供一个错误信息
 */
axios.interceptors.request.use(config => {
  //获取Token
  return config;
}, err => {
  Message.error('请求超时');
  return Promise.resolve(err);
});

/**
 * 响应拦截器
 * @param res - 服务端返回的东西
 * @param error - 出现错误的时候会提供一个错误信息
 */
axios.interceptors.response.use(response => {
  const data = response.data;
  // 根据返回的code值来做不同的处理(和后端约定)
  switch (data.code) {
    case 401: {
      // 未登录
      Message.error("用户未登录，请重新登录。");
      break;
    }
    case 403: {
      // 没有权限
      Message.error("您无权访问改资源，请联系管理员。");
      break;
    }
    case 500: {
      // 错误
      if (data.message !== null) {
        Message.error(data.message);
      } else {
        Message.error("未知错误");
      }
      break;
    }
    default:
      return data;
  }
  return data;
}, (err) => {
  // 返回状态码不为200时候的错误处理
  Message.error(err.toString());
  return Promise.resolve(err);
});

/**
 * 封装统一的get请求
 * @param url - 请求接口地址
 * @param params - 请求接口参数
 */
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: getHeaders()
  });
};

/**
 * 封装统一的get请求
 * @param url - 请求接口地址
 * @param params - 请求接口参数
 */
export const getRequestJson = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: Object.assign({
      'Content-Type': 'application/json'
    }, getHeaders())
  });
};

/**
 * 封装统一的post请求
 * @param url - 请求接口地址
 * @param params - 请求接口参数
 */
export const postRequest = (url, params) => {
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
    headers: Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, getHeaders())
  });
};

/**
 * 封装统一的post请求
 * @param url - 请求接口地址
 * @param params - 请求接口参数
 */
export const postRequestJson = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: Object.assign({
      'Content-Type': 'application/json'
    }, getHeaders())
  });
};

/**
 * 封装大华的post(token)请求
 * @param url - 请求接口地址
 * @param params - 请求接口参数
 */
export const postRequestTokenJson = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

//获取Headers公共方法
const getHeaders = () => {
  let result = {};
  if (globalConfig.httpConfig.isCheckAuthority) {
    Object.assign(result, {
      'Authorization': store.state.user.tokenValue,
    });
  }
  if (globalConfig.httpConfig.isClient) {
    Object.assign(result, {
      'user-client': 1,
    });
  }
  return result;
};