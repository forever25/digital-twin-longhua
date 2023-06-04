/**
 *@author: ljj
 *@Date: 2022-01-11 15:53:03
 *@description: 获取真实的token
 */
import {
  postRequestTokenJson,
} from "@/utils/axios";



/**
 *@author: ljj
 *@Date: 2022-01-11 15:57:57
 *@description: 获取公钥
 参数为
 {
    "loginName": "system"
 }
loginName	用户名 必填
*/
export const getPublicKey = param => {
  return postRequestTokenJson("/WPMS/getPublicKey", param);
};

/**
 *@author: ljj
 *@Date: 2022-01-11 16:02:20
 *@description: 鉴权参数获取(token,userId,userName)
 */
export const login = param => {
  return postRequestTokenJson("/WPMS/login", param);
};