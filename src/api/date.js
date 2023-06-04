//获取当前日期年月日函数
export const getNowFormatDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours(); //获取当前小时数(0-23)
  var minutes = date.getMinutes(); //获取当前分钟数(0-59)
  var seconds = date.getSeconds(); //获取当前秒数(0-59)
  var day;
  switch (date.getDay()) {
    case 0:
      day = "日";
      break;
    case 1:
      day = "一";
      break;
    case 2:
      day = "二";
      break;
    case 3:
      day = "三";
      break;
    case 4:
      day = "四";
      break;
    case 5:
      day = "五";
      break;
    case 6:
      day = "六";
      break;
  }
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (hour >= 1 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  // var nowDate = [year + seperator1 + month + seperator1 + strDate + " 00:00:00", year + seperator1 + month + seperator1 + strDate + " 23:59:59"];
  return [year + seperator1 + month + seperator1 + strDate, hour + seperator2 + minutes + seperator2 + seconds, day];
}