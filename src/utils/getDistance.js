//获取距离
export const getDistance = (pointArr) => {
  console.log(pointArr)
  let distance = 0;
  let num = 0;
  for (let i = 0; i < pointArr.length - 1; i++) {
    if (Math.sqrt(Math.pow((pointArr[i + 1].x - pointArr[i].x), 2) + Math.pow((pointArr[i + 1].y - pointArr[i].y), 2) + Math.pow((pointArr[i + 1].z - pointArr[i].z), 2)) == 0) {
      num += 1;
    }
    distance += Math.sqrt(Math.pow((pointArr[i + 1].x - pointArr[i].x), 2) + Math.pow((pointArr[i + 1].y - pointArr[i].y), 2) + Math.pow((pointArr[i + 1].z - pointArr[i].z), 2));
  }
  console.log(distance)
  if (distance == 0) {
    return 0
  }
  return distance / (pointArr.length - 1 - num) / globalConfig.speed;
}