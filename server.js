const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 80;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 课程数据
const courses = [
  { id: 1, name: 'AI入门基础课程', desc: '适合零基础学员', price: 100, tag: '热门' },
  { id: 2, name: 'AI进阶实战课程', desc: '深入学习机器学习', price: 1000, tag: '推荐' },
  { id: 3, name: 'AI全栈大师课程', desc: '一站式成为AI专家', price: 10000, tag: '精品' }
];

// 内存存储订单数据（演示用）
const orders = new Map();

// 生成订单号
function generateOrderNo() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomStr = '';
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'AI' + Date.now() + randomStr;
}

// 格式化时间
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 健康检查接口
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Course Server is running',
    timestamp: new Date().toISOString()
  });
});

// 获取课程列表
app.get('/api/courses', (req, res) => {
  res.json({
    success: true,
    data: courses
  });
});

// 创建订单
app.post('/api/orders', (req, res) => {
  try {
    const { items, totalPrice, totalCount } = req.body;

    // 验证输入参数
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: '商品列表不能为空'
      });
    }

    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: '订单金额无效'
      });
    }

    if (typeof totalCount !== 'number' || totalCount <= 0) {
      return res.status(400).json({
        success: false,
        message: '商品数量无效'
      });
    }

    // 生成订单号
    const orderNo = generateOrderNo();
    const createTime = formatDateTime(new Date());

    // 创建订单数据
    const orderData = {
      orderNo,
      items,
      totalPrice,
      totalCount,
      status: 'pending', // pending, paid, cancelled
      createTime,
      updateTime: createTime
    };

    // 保存订单到内存
    orders.set(orderNo, orderData);

    res.json({
      success: true,
      orderNo,
      createTime
    });
  } catch (error) {
    console.error('创建订单失败', error);
    res.status(500).json({
      success: false,
      message: '订单创建失败：' + error.message
    });
  }
});

// 获取订单详情
app.get('/api/orders/:orderNo', (req, res) => {
  try {
    const { orderNo } = req.params;

    if (!orders.has(orderNo)) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }

    const orderData = orders.get(orderNo);
    res.json({
      success: true,
      data: orderData
    });
  } catch (error) {
    console.error('获取订单失败', error);
    res.status(500).json({
      success: false,
      message: '获取订单失败：' + error.message
    });
  }
});

// 模拟支付
app.post('/api/pay', (req, res) => {
  try {
    const { orderNo } = req.body;

    if (!orderNo) {
      return res.status(400).json({
        success: false,
        message: '订单号不能为空'
      });
    }

    if (!orders.has(orderNo)) {
      return res.status(404).json({
        success: false,
        message: '订单不存在'
      });
    }

    const orderData = orders.get(orderNo);
    
    // 更新订单状态
    orderData.status = 'paid';
    orderData.updateTime = formatDateTime(new Date());
    orderData.payTime = orderData.updateTime;
    
    orders.set(orderNo, orderData);

    res.json({
      success: true,
      message: '支付成功'
    });
  } catch (error) {
    console.error('支付失败', error);
    res.status(500).json({
      success: false,
      message: '支付失败：' + error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`AI Course Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/courses - 获取课程列表`);
  console.log(`  POST /api/orders - 创建订单`);
  console.log(`  GET  /api/orders/:orderNo - 获取订单详情`);
  console.log(`  POST /api/pay - 模拟支付`);
});
