// 云函数入口文件
const cloud = require('wx-server-sdk')

var rp = require('request-promise');


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var url = "https://free-api.heweather.com/s6/weather/now?key=3de8baccecbc4bed81f49f36827701c9&location="            //获取天气
  var urlTian = "https://free-api.heweather.com/s6/weather/lifestyle?key=3de8baccecbc4bed81f49f36827701c9&location="  //获取注意事项
  // db.collection('openidList').skip(1).limit(100).get()
  //查询所有
  db.collection('openidList').get()
    .then(res => {
      var wxts = "建议着厚外套加毛衣等服装。"
      for (var i = 0; i < res.data.length; i++) {
        var admin_area = res.data[i].admin_area //城市地方
        var location = res.data[i].location
        var openid = res.data[i].openid
        var _id = res.data[i]._id
        
        rp(urlTian+location)
        .then(function(res){
          var xx = JSON.parse(res).HeWeather6[0].lifestyle
          for(var j=0;j<xx.length;j++){
            if(xx[j].type == 'drsg'){
              var index = xx[j].txt.indexOf("。")
              wxts = xx[j].txt.substring(0,index+1)
              console.log("切割后端字符串：-------",wxts)
            }
          }
        })


        //获取城市天气
          rp(url+location)
          .then(function (res) {
            //返回天气结果端处理
            var now = JSON.parse(res).HeWeather6[0].now
            var cond_txt = now.cond_txt //天气
            var tmp = now.tmp//温度
            
            //封装对象
            var data = {
              admin_area:admin_area,
              cond_txt:cond_txt,
              tmp:tmp,
              wxts:wxts,
              openid:openid
            }
            //发送消息订阅
            cloud.callFunction({
              name:'tasong',
              data:data
            }).then(res =>{
              console.log("信息订阅发送成功",res)
            }).catch(res=>{
              console.log("信息订阅发送失败",res)
            })


            console.log("请求返回端天气：",now)
          }).catch(res => {
            console.log("失败", res)
          })
          console.log("被删除端id：",_id)
          db.collection('openidList').where({
            _id:_id
          }).remove()
          .then(res=>{
            console.log("成功删除：",res)
          })
      }
    })
    .catch(err => {
      console.error(err)
    })

}