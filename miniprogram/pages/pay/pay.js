// pages/pay/pay.js
Page({
  data: {
    orderNo: '',
    totalPrice: 0,
    totalCount: 0,
    createTime: '',
    countdown: 900, // 15分钟 = 900秒
    countdownDisplay: '15:00',
    timer: null
  },

  onLoad(options) {
    if (options.orderNo) {
      const now = new Date();
      const createTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      this.setData({
        orderNo: options.orderNo,
        totalPrice: parseFloat(options.totalPrice) || 0,
        totalCount: parseInt(options.totalCount) || 0,
        createTime
      });

      // 启动倒计时
      this.startCountdown();
    }
  },

  onUnload() {
    // 页面卸载时清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  // 启动倒计时
  startCountdown() {
    const timer = setInterval(() => {
      let countdown = this.data.countdown - 1;
      
      if (countdown <= 0) {
        clearInterval(timer);
        this.setData({
          countdown: 0,
          countdownDisplay: '00:00',
          timer: null
        });
        wx.showModal({
          title: '订单已超时',
          content: '请重新下单',
          showCancel: false,
          success: () => {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });
        return;
      }

      const minutes = Math.floor(countdown / 60);
      const seconds = countdown % 60;
      const countdownDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      this.setData({
        countdown,
        countdownDisplay
      });
    }, 1000);

    this.setData({ timer });
  },

  // 立即支付
  payNow() {
    wx.showLoading({
      title: '支付中...',
      mask: true
    });

    const app = getApp();
    const serverUrl = app.globalData.serverUrl;

    // 调用后端支付 API
    wx.request({
      url: `${serverUrl}/api/pay`,
      method: 'POST',
      data: {
        orderNo: this.data.orderNo
      },
      success: (res) => {
        wx.hideLoading();
        
        // 清除定时器
        if (this.data.timer) {
          clearInterval(this.data.timer);
        }

        if (res.data.success) {
          // 跳转到支付结果页
          wx.redirectTo({
            url: `/pages/result/result?success=true&orderNo=${this.data.orderNo}&totalPrice=${this.data.totalPrice}&totalCount=${this.data.totalCount}`
          });
        } else {
          wx.showToast({
            title: res.data.message || '支付失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('支付失败', err);
        wx.showToast({
          title: '支付失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: '提示',
      content: '确定要取消订单吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除定时器
          if (this.data.timer) {
            clearInterval(this.data.timer);
          }

          wx.showToast({
            title: '订单已取消',
            icon: 'success',
            duration: 1500
          });

          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }, 1500);
        }
      }
    });
  }
});
