//获取当前日期年月日函数
export const getNowFormatDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var nowDate = [year + seperator1 + month + seperator1 + strDate + " 00:00:00", year + seperator1 + month + seperator1 + strDate + " 23:59:59"];

  return nowDate;
}