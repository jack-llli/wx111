// app.js
App({
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'YOUR_CLOUD_ENV_ID', // 请填写您的云开发环境ID
        traceUser: true,
      });
    }

    // 从本地存储恢复购物车
    const cart = wx.getStorageSync('cart');
    if (cart) {
      this.globalData.cart = cart;
    }
  },

  globalData: {
    // 课程数据
    courses: [
      {
        id: 1,
        name: 'AI入门基础课程',
        desc: '零基础入门人工智能，掌握AI核心概念与基础算法',
        price: 100,
        image: '/images/course1.jpg',
        tag: '热门'
      },
      {
        id: 2,
        name: 'AI进阶实战课程',
        desc: '深入学习机器学习与深度学习，完成实战项目',
        price: 1000,
        image: '/images/course2.jpg',
        tag: '推荐'
      },
      {
        id: 3,
        name: 'AI全栈大师课程',
        desc: '成为AI全栈工程师，掌握从理论到部署的完整技能',
        price: 10000,
        image: '/images/course3.jpg',
        tag: '精品'
      }
    ],
    // 购物车
    cart: []
  },

  // 保存购物车到本地存储
  saveCart() {
    wx.setStorageSync('cart', this.globalData.cart);
  }
});
