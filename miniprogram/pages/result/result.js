// pages/result/result.js
const app = getApp();

Page({
  data: {
    success: false,
    orderNo: '',
    totalPrice: 0,
    totalCount: 0
  },

  onLoad(options) {
    this.setData({
      success: options.success === 'true',
      orderNo: options.orderNo || '',
      totalPrice: parseFloat(options.totalPrice) || 0,
      totalCount: parseInt(options.totalCount) || 0
    });

    // 如果支付成功，清空购物车中已购买的商品
    if (this.data.success) {
      app.globalData.cart = [];
      app.saveCart();
      
      // 移除购物车徽章
      wx.removeTabBarBadge({
        index: 1
      });
    }
  },

  // 开始学习
  startLearning() {
    wx.showToast({
      title: '即将开始学习',
      icon: 'success',
      duration: 1500
    });

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1500);
  },

  // 返回首页
  backToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
