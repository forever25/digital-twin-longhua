/**
 * @description: 大华监控设备相关接口
 * @author: wzd
 * @date: 2022-01-05 16:28:50
 */

import {
  postRequestJson,
  postRequest,
  getRequest
} from "@/utils/axios";
//获取大华摄像头实时视频流
export const getHlsVideoStream = (url, param) => {
  return postRequest(url, param);
};

//获取大华摄像头设备分页
export const getMonitorInfoByCondition = param => {
  return postRequestJson(globalConfig.dahuaMonitorUrl, param);
};

// 获取所有设备数据
export const getAllDeviceInfo = () => {
  // return postRequestJson("/dhH8900CameraInfo/getDeviceListByConditionWithPage", params);
  return getRequest("/dhChannelInfo/getAllChannel");
}

// 根据查询条件分页获取设备列表(支持排序)接口_同步大华设备的在线状态

export const getDeviceListByConditionWithPage = params => {
  // return postRequestJson("/dhH8900CameraInfo/getDeviceListByConditionWithPage", params);
  return postRequestJson("/dhChannelInfo/getChannelListByConditionWithPage", params);
}

// 分页获取设备列表(支持排序)接口_同步大华设备的在线状态

export const getDeviceListWithPage = params => {
  // return postRequestJson("/dhH8900CameraInfo/getDeviceListWithPage", params);
  return postRequestJson("/dhCameraInfo/getDeviceListWithPage", params);

}

//根据摄像头在大华数据库中的Id获取摄像头的视频通道编码
export const getDeviceChannelId = params => {
  return getRequest("/dhH8900CameraInfo/getDeviceChannelCode/" + params);
};

// 摄像头移动操作
export const cameraMoveControl = params => {
  return postRequest("/dhCameraInfo/cameraMoveControl", params);
};

// 摄像头缩放
export const cameraControl = params => {
  return postRequest("/dhCameraInfo/cameraControl", params);
};