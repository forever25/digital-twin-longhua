/*
 * @Author: ZWS
 * @Date: 2022-03-18 11:15:49
 * @LastEditTime: 2022-03-18 19:34:30
 * @Description: 处理垃圾桶数据
 */

import MintpassRubbishData from './data/MintpassRubbish.json'


const MintpassRubbishList = []
MintpassRubbishData.features.forEach(it => {
  MintpassRubbishList.push({
    ...it.attributes,
    lon: it.geometry.x,
    lat: it.geometry.y,
    heading: 100,
    pitch: -30,
    alt: -14,
    time:`2022-01-23 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    name: `${it.attributes.OBJNAME}${it.attributes.OBJECTID}`,
    status: ['正常', '异味', '溢出', '故障'][Math.floor(Math.random() * 4)],
  })
})
window.globalConfig.MintpassRubbish = MintpassRubbishList