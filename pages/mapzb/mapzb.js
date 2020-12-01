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
  fs(openid){
    wx.cloud.callFunction({
      name:"tasong",
      data:{
        openid:openid
      }
    }).then(res =>{
      console.log("发送成功",res)
    }).catch(res =>{
      console.log("发送失败",res)
    })
  },
  
})