/*
 * @Author: ZWS
 * @Date: 2022-03-18 14:20:42
 * @LastEditTime: 2022-03-18 18:24:30
 * @Description: 文件描述
 */

AKeyToCall = window.globalConfig.AKeyToCall.map((it, i) => {
  let randomX = Math.random() * 0.01;
  let randomY = Math.random() * 0.01;
  while (randomX > 0.005) {
    randomX = Math.random() * 0.001;
  }
  while (randomY > 0.0035) {
    randomY = Math.random() * 0.001;
  }
  return {
    ...it,
    type: ['走失定位', '健康监测', '紧急救助', '主动关怀'][Math.floor(Math.random() * 4)],
    lon: 113.99858236312866 + randomX,
    lat: 22.678747728881326 + randomY,
    alt: 60.5,
    pitch: -30,
    name: '人员' + i,
    id: Math.random().toString(32).substring(2),
    warning: Math.random() > 0.7,
    status: Math.random() < 0.7 ? "已处理" : "待处理",
    time: `2022-01-1${Math.ceil(Math.random() * 9)}`,
  }
})

window.globalConfig.AKeyToCall = AKeyToCall