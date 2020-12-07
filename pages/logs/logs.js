const app = getApp()
const config = app.globalData.config
const util = app.globalData.util
Page({
    data: {
        bgImgUrl: config.BG_IMG_BASE_URL + '/calm.jpg', // 背景图片地址
        greetings: '', // 问候语
        dataSet: [] //数据集合
    },
    onShow() {
        var _this = this
        _this.setData({
            greetings: util.getGreetings()
        })

        //初始化数据
        _this.init()
        

    },
    //初始化数据
    init(){
        //发送请求获取数据
        wx.cloud.callFunction({
            name: "xcxList",
        }).then(res => {
            for (var i = 0; i < res.result.data.length; i++) {
                //处理时间
                res.result.data[i].time = Date.parse(res.result.data[i].time) / 1000
            }
            console.log("获取dataSet成功", res.result.data)
            this.setData({
                dataSet: res.result.data
            })
        }).catch(res => {
            console.log("获取dataSet出错", res)
        })
    },
    handleLike: function (event) {
        const cardId = event.detail.card_id
        // code here.
        // wx.showToast({
        //     title: '服务开发中...',
        //     icon: 'none',
        //     duration: 2000
        // })

        var _this = this
        //判断是什么Id
        var list = _this.data.dataSet;
        for (var index in list) {
            if (list[index].id == cardId) {
                var liked = list[index]
                liked.leix = "liked"
                _this.updated(liked)

                if(!liked.liked){
                    wx.showToast({
                        title: '点赞成功',
                        icon: 'success',
                        duration: 1500//持续的时间
                      })
                }else{
                    wx.showToast({
                        title: '您已取消点赞',
                        icon: 'none',
                        duration: 1500//持续的时间
                      })
                }
                setTimeout(function () {
                    //要延时执行的代码
                    _this.init()
                   }, 300) //延迟时间 这里是1秒
            }
        }

    },
    tapCard: function (event) {
        var _this = this
        var cardId = event.detail.card_id
        //判断是什么Id
        if(cardId == null || cardId === ''){
            cardId = event.detail.user_id
        }
        var list = _this.data.dataSet;
        for (var index in list) {
            if (list[index].id == cardId) {
                var tiaoz = list[index]
                wx.navigateToMiniProgram({
                    appId: tiaoz.user.appid,
                    path: tiaoz.user.path,
                    envVersion: 'release',
                    success(res) {
                        console.log("打开成功", tiaoz)
                        tiaoz.leix = "tiaoz"
                        _this.updated(tiaoz)
                    }
                })
            }
        }
        // console.log('tap card!')
    },
    //修改跳转成功计数
    updated(tiaoz) {
        wx.cloud.callFunction({
            name: "updated",
            data: tiaoz,
        }).then(res => {
            console.log("updated成功", res)
        }).catch(res => {
            console.log("updated修改出错", res)
        })
    },
    handleUserEvent: function (event) {
        const userId = event.detail.user_id
        this.tapCard(event)
        // wx.showToast({
        //     title: '服务开发中...',
        //     icon: 'none',
        //     duration: 2000
        // })
    },
    //点击展开
    handleExpand: function (event) {
        const cardId = event.detail.card_id
        const expandStatus = event.detail.expand_status
        // code here
        console.log("expand call back")
    }
})