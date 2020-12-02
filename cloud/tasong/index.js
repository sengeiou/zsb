// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  res: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {

  var date = new Date()

  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,
      page: '/pages/weather/weather',
      data: {
        date1: {
          //value: new Date().toFormat("YYYY-MM-DD") 
          value:date.getFullYear()+"年"+(date.getMonth() + 1)+"月"+date.getDate()+"日"
        },
        phrase2: {
          value: event.admin_area
          //value:'重庆市'
        },
        phrase3: {
          value: event.cond_txt
        },
        character_string4: {
          value: event.tmp+'°'
        },
        thing5: {
          value: event.wxts
        }
      },
      templateId: 'Q1gkgyEtSAG0HTUoZSjgDhThPEWw4dsBtZCYdjLhYtY',
      miniprogramState: 'developer'
    })
    return result
  } catch (err) {
    return err
  }


}