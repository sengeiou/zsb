// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  res: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    console.log("进来了")
    console.log(event)
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.userInfo.openId,
      page: '/pages/weather/weather',
      // lang: 'zh_CN',
      data: {
        date1: {
          value: '2019年10月15日'
        },
        phrase2: {
          value: '重庆市'
        },
        phrase3: {
          value: '晴'
        },
        character_string4: {
          value: '25~28°'
        },
        thing5: {
          value: '温度较低，请注意保暖哦'
        }
      },
      templateId: 'Q1gkgyEtSAG0HTUoZSjgDhThPEWw4dsBtZCYdjLhYtY',
    //  miniprogramState: 'developer'
    })
    return result
  } catch (err) {
    return err
  }


}