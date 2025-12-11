// pages/order/order.js
Page({
  data: {
    items: [],
    totalPrice: 0,
    totalCount: 0,
    discount: 0,
    finalPrice: 0,
    selectedPayment: 'wechat'
  },

  onLoad(options) {
    if (options.items) {
      const items = JSON.parse(decodeURIComponent(options.items));
      const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
      const totalCount = items.reduce((sum, item) => sum + item.count, 0);
      const discount = 0;
      const finalPrice = totalPrice - discount;

      this.setData({
        items,
        totalPrice,
        totalCount,
        discount,
        finalPrice
      });
    }
  },

  // 选择支付方式
  selectPayment(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({
      selectedPayment: method
    });
  },

  // 提交订单
  submitOrder() {
    wx.showLoading({
      title: '创建订单中...',
      mask: true
    });

    // 调用云函数创建订单
    wx.cloud.callFunction({
      name: 'createOrder',
      data: {
        items: this.data.items,
        totalPrice: this.data.finalPrice,
        totalCount: this.data.totalCount
      },
      success: (res) => {
        wx.hideLoading();
        if (res.result.success) {
          // 创建成功，跳转到支付页
          const order = res.result.data;
          wx.redirectTo({
            url: `/pages/pay/pay?orderNo=${order.orderNo}&totalPrice=${order.totalPrice}&totalCount=${order.totalCount}`
          });
        } else {
          wx.showToast({
            title: res.result.message || '订单创建失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('创建订单失败', err);
        wx.showToast({
          title: '订单创建失败，请重试',
          icon: 'none'
        });
      }
    });
  }
});
