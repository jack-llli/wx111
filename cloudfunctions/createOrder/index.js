// cloudfunctions/createOrder/index.js
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 生成订单号
function generateOrderNo() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'AI' + Date.now() + randomStr;
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  try {
    const { items, totalPrice, totalCount } = event;

    // 验证输入参数
    if (!Array.isArray(items) || items.length === 0) {
      return {
        success: false,
        message: '商品列表不能为空'
      };
    }

    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return {
        success: false,
        message: '订单金额无效'
      };
    }

    if (typeof totalCount !== 'number' || totalCount <= 0 || !Number.isInteger(totalCount)) {
      return {
        success: false,
        message: '商品数量无效'
      };
    }

    // 生成订单号
    const orderNo = generateOrderNo();

    // 创建订单数据
    const orderData = {
      orderNo,
      openid: wxContext.OPENID,
      items,
      totalPrice,
      totalCount,
      status: 'pending', // pending, paid, cancelled
      createTime: new Date(),
      updateTime: new Date()
    };

    // 插入订单到数据库
    const result = await db.collection('orders').add({
      data: orderData
    });

    return {
      success: true,
      data: {
        ...orderData,
        _id: result._id
      },
      message: '订单创建成功'
    };
  } catch (err) {
    console.error('创建订单失败', err);
    return {
      success: false,
      message: '订单创建失败：' + err.message
    };
  }
};
