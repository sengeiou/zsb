const app = getApp()
const config = app.globalData.config
const util = app.globalData.util
Page({
    data: {
        bgImgUrl: config.BG_IMG_BASE_URL + '/calm.jpg', // 背景图片地址
        greetings: '', // 问候语
        dataSet: []//数据集合
    },
    onShow(){
        var _this = this
        this.setData({
            greetings: util.getGreetings()
        })

        //发送请求获取数据
        wx.cloud.callFunction({
            name: "xcxList",
        }).then(res=>{
            for(var i=0;i<res.result.data.length;i++){
                //处理时间
                res.result.data[i].time = Date.parse(res.result.data[i].time)/1000
            }
            console.log("获取dataSet成功",res.result.data)
            _this.setData({
                dataSet:res.result.data
            })
            console.log("数据---",_this.data.dataSet)
        
        }).catch(res=>{
            console.log("获取dataSet出错",res)
        })
        
    },
    handleLike: function (event) {
        const cardId =  event.detail.card_id
        // code here.
        wx.showToast({
            title: '服务开发中...',
            icon: 'none',
            duration: 2000
          })
        console.log('tap like!')
        },
    tapCard: function (event) {
        var _this = this
        const cardId = event.detail.card_id
        console.log(event)
        var list = _this.data.dataSet;
        for (var index in list) {
            if(list[index].id == cardId){
                console.log("跳转了",list[index])
                wx.navigateToMiniProgram({
                    appId: list[index].user.appid,
                    path: list[index].user.path,
                    envVersion: 'release',
                    success(res) {
                      console.log("打开成功",res)
                    }
                  })
            }
         }
        console.log('tap card!')
    },
    handleUserEvent: function (event) {
        const userId = event.detail.user_id
        // code here.
        
        wx.showToast({
            title: '服务开发中...',
            icon: 'none',
            duration: 2000
          })
        console.log('tap user!')
    },
    
    handleExpand: function (event) {
        const cardId = event.detail.card_id
        const expandStatus = event.detail.expand_status
        // code here
        console.log("expand call back")
    }
})