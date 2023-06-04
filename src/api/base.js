/*
 * @Author: zws
 * @Date: 2022-01-19 15:24:30
 * @LastEditTime: 2022-01-19 15:26:32
 * @LastEditors: zws
 * @Description: 公共接口
 */
import {
    getRequest
  } from "@/utils/axios";

export const getDhCameraInfoToken = () => {
    return getRequest("/dhCameraInfo/getToken");
  };
