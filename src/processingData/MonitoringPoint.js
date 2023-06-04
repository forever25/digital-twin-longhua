/*
 * @Author: ZWS
 * @Date: 2022-03-18 13:47:20
 * @LastEditTime: 2022-03-18 18:58:22
 * @Description: 监控点位
 */
import MonitoringPoint from './data/MonitoringPoint.json'


const MonitoringPointList = []
MonitoringPoint.features.find((it, index) => {
  MonitoringPointList.push({
    ...it.attributes,
    lon: it.geometry.x,
    lat: it.geometry.y,
    heading: 100,
    pitch: -30,
    alt: 30.5,
    time: `2022-01-23 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
    name: `消防通道${it.attributes.OBJECTID}`,
    status: '正常',
  })

  return index >= 3
});

[
  [114.00011658668518,
    22.682014457306185],
  [114.00231599807739,
    22.679737654805415],
  [113.99970889091492,
    22.680133623173795],
  [114.00278806686401,
    22.681578898013477]
].forEach((it, index) => {
  MonitoringPointList[index].lon = it[0]
  MonitoringPointList[index].lat = it[1]
})
MonitoringPointList[MonitoringPointList.length - 1].status = '异常'

window.globalConfig.MonitoringPoint = MonitoringPointList