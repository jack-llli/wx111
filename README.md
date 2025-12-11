# AI课程购买微信小程序

一个完整的微信小程序AI课程商城项目，包含课程浏览、购物车、订单确认、支付和支付结果页面。

## ✨ 功能特性

- 📚 **课程列表** - 展示3门AI课程，包含课程图片、描述、价格和标签
- 🛒 **购物车管理** - 支持添加、删除、修改数量、全选等功能
- 📋 **订单确认** - 查看课程清单、价格明细和选择支付方式
- 💳 **在线支付** - 模拟微信支付流程，带15分钟倒计时
- ✅ **支付结果** - 展示支付成功页面和订单摘要

## 📸 项目截图

> 注意：实际使用时需要替换为真实的截图图片

## 📁 项目结构

```
wx111/
├── cloudfunctions/              # 云函数目录
│   └── createOrder/             # 创建订单云函数
│       ├── index.js             # 云函数逻辑
│       └── package.json         # 依赖配置
├── miniprogram/                 # 小程序主目录
│   ├── pages/                   # 页面文件
│   │   ├── index/               # 首页-课程列表
│   │   │   ├── index.js
│   │   │   ├── index.json
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   ├── cart/                # 购物车页面
│   │   │   ├── cart.js
│   │   │   ├── cart.json
│   │   │   ├── cart.wxml
│   │   │   └── cart.wxss
│   │   ├── order/               # 订单确认页面
│   │   │   ├── order.js
│   │   │   ├── order.json
│   │   │   ├── order.wxml
│   │   │   └── order.wxss
│   │   ├── pay/                 # 支付页面
│   │   │   ├── pay.js
│   │   │   ├── pay.json
│   │   │   ├── pay.wxml
│   │   │   └── pay.wxss
│   │   └── result/              # 支付结果页面
│   │       ├── result.js
│   │       ├── result.json
│   │       ├── result.wxml
│   │       └── result.wxss
│   ├── images/                  # 图片资源目录
│   │   └── .gitkeep
│   ├── app.js                   # 小程序逻辑
│   ├── app.json                 # 小程序配置
│   ├── app.wxss                 # 全局样式
│   └── sitemap.json             # 站点地图
├── project.config.json          # 项目配置
├── .gitignore                   # Git忽略文件
└── README.md                    # 项目说明文档
```

## 🚀 环境准备

### 1. 下载微信开发者工具

访问 [微信开发者工具下载页面](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) 下载并安装适合你操作系统的版本。

### 2. 注册微信小程序账号

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 注册小程序账号
3. 获取你的 AppID

## 📦 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/jack-llli/wx111.git
cd wx111
```

### 2. 打开项目

1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择项目目录
4. 填写你的 AppID（测试时可使用测试号）

## ☁️ 云开发配置

### 1. 开通云开发

1. 在微信开发者工具中，点击顶部菜单栏的"云开发"按钮
2. 首次使用需要开通云开发
3. 创建云环境（建议环境名称：`ai-course-prod`）
4. 等待环境初始化完成（约1-3分钟）

### 2. 获取云环境ID

1. 在云开发控制台，点击"设置"
2. 找到"环境ID"并复制
3. 打开 `miniprogram/app.js` 文件
4. 将 `YOUR_CLOUD_ENV_ID` 替换为你的云环境ID：

```javascript
wx.cloud.init({
  env: 'your-env-id-here', // 替换为你的云环境ID
  traceUser: true,
});
```

### 3. 创建数据库集合

1. 在云开发控制台，点击"数据库"
2. 点击"添加集合"
3. 创建名为 `orders` 的集合
4. 设置集合权限：
   - 读权限：仅创建者可读
   - 写权限：仅创建者可写

### 4. 部署云函数

1. 在微信开发者工具左侧，找到 `cloudfunctions` 目录
2. 右键点击 `createOrder` 文件夹
3. 选择"上传并部署：云端安装依赖（不上传node_modules）"
4. 等待部署完成

## 🖼️ 图片资源准备

项目需要以下图片资源，请准备相应图片并放入 `miniprogram/images/` 目录：

### 必需的图片文件

| 文件名 | 用途 | 建议尺寸 |
|--------|------|----------|
| `banner.jpg` | 首页横幅背景 | 750×640px |
| `course1.jpg` | AI入门基础课程封面 | 750×560px |
| `course2.jpg` | AI进阶实战课程封面 | 750×560px |
| `course3.jpg` | AI全栈大师课程封面 | 750×560px |
| `course.png` | 课程Tab图标（未选中） | 81×81px |
| `course-active.png` | 课程Tab图标（选中） | 81×81px |
| `cart.png` | 购物车Tab图标（未选中） | 81×81px |
| `cart-active.png` | 购物车Tab图标（选中） | 81×81px |
| `empty-cart.png` | 空购物车占位图 | 480×480px |
| `wechat-pay.png` | 微信支付图标 | 96×96px |
| `logo.png` | 商城Logo | 120×120px |

### 图片说明

- 所有图片建议使用PNG或JPG格式
- Tab图标建议使用透明背景的PNG格式
- 课程封面建议使用高清图片，确保在不同屏幕上显示清晰
- 可以使用免费图片网站（如Unsplash、Pexels）下载AI相关的图片

## 🔧 本地运行

1. 确保已完成云开发配置
2. 确保已准备好所需图片资源
3. 在微信开发者工具中点击"编译"按钮
4. 在模拟器中查看运行效果
5. 也可以点击"预览"生成二维码，在手机上测试

## 📤 上传和发布

### 1. 上传代码

1. 在微信开发者工具中，点击右上角"上传"按钮
2. 填写版本号和项目备注
3. 点击"上传"

### 2. 提交审核

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入"开发管理" > "开发版本"
3. 找到刚上传的版本，点击"提交审核"
4. 填写审核信息并提交

### 3. 发布上线

1. 审核通过后，在"审核版本"中点击"发布"
2. 确认发布后，小程序即可上线

## ⚠️ 注意事项

### 安全提示

- ⚠️ **不要泄露AppSecret** - AppSecret是敏感信息，不要上传到公开的Git仓库
- ⚠️ **数据库权限** - 生产环境需要合理配置数据库权限，避免数据泄露
- ⚠️ **云函数安全** - 云函数需要对输入参数进行验证，防止恶意调用

### 项目配置

- 本项目使用的AppID (`wx3b4a96add4a64565`) 仅为示例
- 实际使用时需要替换为你自己的AppID
- 云环境ID需要替换为你自己的云环境ID

### 开发建议

- 使用真机调试测试支付流程
- 定期备份云数据库数据
- 开发环境和生产环境使用不同的云环境

## 💳 真实微信支付集成

当前项目使用模拟支付流程。如需接入真实的微信支付，需要：

### 准备工作

1. **申请微信商户号**
   - 访问 [微信支付商户平台](https://pay.weixin.qq.com/)
   - 完成商户申请和资质审核

2. **获取支付密钥**
   - 登录微信商户平台
   - 在"账户中心" > "API安全"中设置API密钥

3. **配置支付参数**
   - 小程序AppID
   - 微信商户号（mch_id）
   - API密钥（key）

### 开发步骤

1. **创建支付云函数**
   - 创建新的云函数 `payment`
   - 安装 `tenpay` 或类似的微信支付SDK
   - 实现统一下单接口

2. **修改订单流程**
   - 在 `pages/order/order.js` 中调用支付云函数
   - 获取支付参数后调用 `wx.requestPayment()`
   - 处理支付回调结果

3. **支付结果处理**
   - 配置支付结果通知URL
   - 创建云函数接收微信支付回调
   - 更新订单状态

### 参考文档

- [微信支付开发文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)
- [小程序支付接入指引](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)

## 📝 技术栈

- 微信小程序原生框架
- 微信云开发
- 云函数 (Node.js)
- 云数据库 (MongoDB)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License

## 📧 联系方式

如有问题，欢迎通过GitHub Issues联系。

---

**祝你开发愉快！** 🎉