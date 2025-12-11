const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 80;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 课程数据
const courses = [
  {
    id: 1,
    name: 'AI入门基础课程',
    desc: '适合零基础学员，从Python基础到机器学习入门',
    price: 100,
    image: '/images/course1.png',
    tag: '热门'
  },
  {
    id: 2,
    name: 'AI进阶实战课程',
    desc: '深入学习深度学习、神经网络和实战项目',
    price: 1000,
    image: '/images/course2.png',
    tag: '推荐'
  },
  {
    id: 3,
    name: 'AI全栈大师课程',
    desc: '一站式成为AI专家，涵盖CV、NLP、大模型',
    price: 10000,
    image: '/images/course3.png',
    tag: '精品'
  }
];

// 订单存储（内存）
const orders = new Map();

// 访问计数器
let visitCount = 0;

// 健康检查
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI课程商城服务运行中',
    timestamp: new Date().toISOString()
  });
});

// 获取访问计数
app.get('/api/count', (req, res) => {
  visitCount++;
  res.json({ 
    success: true, 
    count: visitCount,
    timestamp: new Date().toISOString()
  });
});

// 获取课程列表
app.get('/api/courses', (req, res) => {
  res.json({ success: true, data: courses });
});

// 创建订单
app.post('/api/orders', (req, res) => {
  const { items, totalPrice, totalCount } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: '订单商品不能为空' });
  }
  
  const orderNo = 'AI' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase();
  const now = new Date();
  const createTime = now.getFullYear() + '-' + 
    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
    String(now.getDate()).padStart(2, '0') + ' ' + 
    String(now.getHours()).padStart(2, '0') + ':' + 
    String(now.getMinutes()).padStart(2, '0') + ':' + 
    String(now.getSeconds()).padStart(2, '0');
  
  const order = {
    orderNo,
    items,
    totalPrice,
    totalCount,
    status: 'pending',
    createTime,
    updateTime: createTime
  };
  
  orders.set(orderNo, order);
  
  res.json({ success: true, orderNo, createTime });
});

// 获取订单详情
app.get('/api/orders/:orderNo', (req, res) => {
  const { orderNo } = req.params;
  const order = orders.get(orderNo);
  
  if (!order) {
    return res.status(404).json({ success: false, message: '订单不存在' });
  }
  
  res.json({ success: true, data: order });
});

// 模拟支付
app.post('/api/pay', (req, res) => {
  const { orderNo } = req.body;
  
  if (!orderNo) {
    return res.status(400).json({ success: false, message: '订单号不能为空' });
  }
  
  const order = orders.get(orderNo);
  if (!order) {
    return res.status(404).json({ success: false, message: '订单不存在' });
  }
  
  order.status = 'paid';
  const now = new Date();
  order.updateTime = now.getFullYear() + '-' + 
    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
    String(now.getDate()).padStart(2, '0') + ' ' + 
    String(now.getHours()).padStart(2, '0') + ':' + 
    String(now.getMinutes()).padStart(2, '0') + ':' + 
    String(now.getSeconds()).padStart(2, '0');
  
  orders.set(orderNo, order);
  
  res.json({ success: true, message: '支付成功' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '接口不存在',
    path: req.path,
    method: req.method
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ 
    success: false, 
    message: '服务器内部错误',
    error: err.message
  });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI课程商城服务已启动`);
  console.log(`监听端口: ${PORT}`);
  console.log(`启动时间: ${new Date().toISOString()}`);
});

// 优雅退出
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，准备关闭服务...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到 SIGINT 信号，准备关闭服务...');
  process.exit(0);
});
