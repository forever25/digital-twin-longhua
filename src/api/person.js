import {
  postRequestJson,
  postRequest
} from "@/utils/axios";

// 获取人员列表接口
export const getFaceListWithPage = params => {
  // return postRequestJson("/dhH8900CameraInfo/getFaceListWithPage", params);
  return postRequestJson("/dhCameraInfo/getFaceListWithPage", params);

}

// 获取人员轨迹列表
export const getPersonTrajectory = params => {
  // return postRequestJson("/dhH8900CameraInfo/getPersonTrajectory", params);
  return postRequest("/dhCameraInfo/getPersonTrajectory", params);

}