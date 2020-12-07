// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("update修改数据：", event)

  if(event.leix == "tiaoz"){
    return await db.collection('dataSet').where({
      _id: event._id
    }).update({
      data: {
        count: event.count + 1
      }
    }).catch(res => {
      console.log("update修改数据出错", res)
    })
  }else if(event.leix == "liked"){
    return await db.collection('dataSet').where({
      _id: event._id
    }).update({
      data: {
        likedCount: event.liked?event.likedCount-1:event.likedCount+1,
        liked:event.liked?false:true
      }
    }).catch(res => {
      console.log("liked点赞数据出错", res)
    })
  }
  
}