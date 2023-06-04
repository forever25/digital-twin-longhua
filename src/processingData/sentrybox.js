
/*
 * @Author: ZWS
 * @Date: 2022-03-18 13:47:20
 * @LastEditTime: 2022-03-18 17:05:30
 * @Description: 岗亭
 */
import zhiangangting from './data/zhiangangting.json'


const zhiangangtingList = [];
zhiangangting.features.forEach(it => {
  zhiangangtingList.push({
    ...it.attributes,
    lon: it.geometry.x,
    lat: it.geometry.y,
    heading: 100,
    tel: 18139275869,
    pitch: -30,
    alt: 30.5,
    src: Math.random() > 0.5 ? require("@/assets/zhiangangangting/OIP-C.jpg") : require("@/assets/zhiangangangting/R-C.jpg"),
    time: `2022-01-23 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    name: `${it.attributes.OBJNAME}${it.attributes.OBJECTID}`,
    status: '正常',
  })
})
window.globalConfig.zhiangangting = zhiangangtingList