const chelaile = requirePlugin("chelaile")
Page({
    data: {
        mCanUse: false,
        chelaileUrl: ''
    },
    onLoad: function () {
        if (chelaile.caniuse()) {
            let url = chelaile.getNavigatorUrl({
                plugin: 'chelaile', // 用户定义的插件名字
                lng: 116.410288, // 经纬度
                lat: 39.995941,
                vendor: '请联系商务获取' // 来源
            });
            this.setData({
                mCanUse: true,
                chelaileUrl: url
            })
        } else {
            this.setData({
                mCanUse: false
            })
        }
    }
});