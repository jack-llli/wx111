// pages/index/index.js
const app = getApp();

Page({
  data: {
    courses: []
  },

  onLoad() {
    this.setData({
      courses: app.globalData.courses
    });
  },

  onShow() {
    // 更新购物车徽章
    this.updateCartBadge();
  },

  // 更新购物车徽章
  updateCartBadge() {
    const cartCount = app.globalData.cart.reduce((sum, item) => sum + item.count, 0);
    if (cartCount > 0) {
      wx.setTabBarBadge({
        index: 1,
        text: String(cartCount)
      });
    } else {
      wx.removeTabBarBadge({
        index: 1
      });
    }
  },

  // 加入购物车
  addToCart(e) {
    const courseId = e.currentTarget.dataset.id;
    const course = app.globalData.courses.find(c => c.id === courseId);
    
    if (!course) return;

    // 检查是否已在购物车
    const cartItem = app.globalData.cart.find(item => item.id === courseId);
    
    if (cartItem) {
      // 已存在，数量+1
      cartItem.count += 1;
    } else {
      // 不存在，添加新项
      app.globalData.cart.push({
        ...course,
        count: 1,
        selected: true
      });
    }

    // 保存购物车
    app.saveCart();

    // 更新徽章
    this.updateCartBadge();

    // 显示成功提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
  },

  // 获取标签类名
  getTagClass(tag) {
    const tagMap = {
      '热门': 'tag-hot',
      '推荐': 'tag-recommend',
      '精品': 'tag-premium'
    };
    return tagMap[tag] || '';
  }
});
