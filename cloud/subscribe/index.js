// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  res:cloud.DYNAMIC_CURRENT_ENV
})
//创建获取数据连接
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("用户端信息",event)
  //给指定端云数据库添加数据
  db.collection("openidList").add({
    // data 字段表示需新增的 JSON 数据
    data:{
      admin_area:event.admin_area,//用户的地址定位
      location:event.location,//用户的坐标
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      due: new Date()
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}