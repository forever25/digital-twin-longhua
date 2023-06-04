//项目信息有关接口
import {
  getRequest,
} from "@/utils/axios";

//获取所有项目信息
export const getAllProjectInfo = () => {
  return getRequest("/projectBaseInfo/getAll");
};