Page({
  //获取用户openid
  getopenid(){
    var _this = this;
    wx.cloud.callFunction({
      name:"subscribe"
    }).then(res =>{
      console.log("获取openid成功",res)
      _this.fs(res.result.openid)
    }).catch(res =>{
      console.log("获取openid失败",res)
    })
  },
  sq(){
    wx.requestSubscribeMessage({
      tmplIds: ['Q1gkgyEtSAG0HTUoZSjgDhThPEWw4dsBtZCYdjLhYtY'],
      success (res) { 
        console.log("授权成功")
      },
      fail(res){
        console.log(res)
      }
    })
  },

  fs(){
    wx.cloud.callFunction({
      name:"tasong",
      data:{
        openid:'ocIL15XaIvoe00RLNjvSw5kg0-i4',
        admin_area:"重庆市",
        cond_txt:"晴",
        tmp:'9',
        wxts:"建议着厚外套加毛衣等服装。",
      }
    }).then(res =>{
      console.log("发送成功",res)
    }).catch(res =>{
      console.log("发送失败",res)
    })
  },
  
})