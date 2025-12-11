// pages/cart/cart.js
const app = getApp();

Page({
  data: {
    cart: [],
    allSelected: false,
    totalPrice: 0,
    selectedCount: 0
  },

  onShow() {
    this.loadCart();
  },

  // 加载购物车
  loadCart() {
    this.setData({
      cart: app.globalData.cart
    }, () => {
      this.updateCart();
    });
  },

  // 更新购物车统计
  updateCart() {
    const cart = this.data.cart;
    const selectedItems = cart.filter(item => item.selected);
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.count, 0);
    const selectedCount = selectedItems.reduce((sum, item) => sum + item.count, 0);
    const allSelected = cart.length > 0 && cart.every(item => item.selected);

    this.setData({
      totalPrice,
      selectedCount,
      allSelected
    });

    // 保存到全局
    app.globalData.cart = cart;
    app.saveCart();

    // 更新徽章
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

  // 切换选中状态
  toggleSelect(e) {
    const id = e.currentTarget.dataset.id;
    const cart = this.data.cart;
    const item = cart.find(item => item.id === id);
    if (item) {
      item.selected = !item.selected;
      this.setData({ cart }, () => {
        this.updateCart();
      });
    }
  },

  // 全选/取消全选
  toggleAllSelect() {
    const allSelected = !this.data.allSelected;
    const cart = this.data.cart.map(item => ({
      ...item,
      selected: allSelected
    }));
    this.setData({ cart }, () => {
      this.updateCart();
    });
  },

  // 减少数量
  decreaseCount(e) {
    const id = e.currentTarget.dataset.id;
    const cart = this.data.cart;
    const item = cart.find(item => item.id === id);
    if (item && item.count > 1) {
      item.count -= 1;
      this.setData({ cart }, () => {
        this.updateCart();
      });
    }
  },

  // 增加数量
  increaseCount(e) {
    const id = e.currentTarget.dataset.id;
    const cart = this.data.cart;
    const item = cart.find(item => item.id === id);
    if (item) {
      item.count += 1;
      this.setData({ cart }, () => {
        this.updateCart();
      });
    }
  },

  // 输入数量
  inputCount(e) {
    const id = e.currentTarget.dataset.id;
    const value = parseInt(e.detail.value) || 1;
    const cart = this.data.cart;
    const item = cart.find(item => item.id === id);
    if (item) {
      item.count = Math.max(1, value);
      this.setData({ cart }, () => {
        this.updateCart();
      });
    }
  },

  // 删除商品
  deleteItem(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该课程吗？',
      success: (res) => {
        if (res.confirm) {
          const cart = this.data.cart.filter(item => item.id !== id);
          this.setData({ cart }, () => {
            this.updateCart();
          });
        }
      }
    });
  },

  // 去选课
  goToIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 去结算
  checkout() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请选择要购买的课程',
        icon: 'none'
      });
      return;
    }

    // 获取选中的商品
    const selectedItems = this.data.cart.filter(item => item.selected);
    
    // 跳转到订单页
    wx.navigateTo({
      url: `/pages/order/order?items=${encodeURIComponent(JSON.stringify(selectedItems))}`
    });
  }
});
