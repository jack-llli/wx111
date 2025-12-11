# AI课程购买微信小程序

一个完整的微信小程序AI课程商城项目，使用**微信云托管**部署 Node.js 后端服务。

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
├── miniprogram/                 # 小程序主目录
│   ├── pages/                   # 页面文件
│   │   ├── index/               # 首页-课程列表
│   │   ├── cart/                # 购物车页面
│   │   ├── order/               # 订单确认页面
│   │   ├── pay/                 # 支付页面
│   │   └── result/              # 支付结果页面
│   ├── images/                  # 图片资源目录
│   ├── app.js                   # 小程序逻辑
│   ├── app.json                 # 小程序配置
│   ├── app.wxss                 # 全局样式
│   └── sitemap.json             # 站点地图
├── Dockerfile                   # Docker 容器配置
├── container.config.json        # 云托管配置文件
├── package.json                 # Node.js 后端依赖
├── server.js                    # Express 后端服务
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

## ☁️ 微信云托管部署

### 1. 开通云托管

1. 在微信开发者工具中，点击顶部菜单栏的"云开发"按钮
2. 进入云开发控制台
3. 选择"云托管"标签页
4. 首次使用需要开通云托管服务
5. 创建云托管环境（建议环境名称：`ai-course-prod`）
6. 等待环境初始化完成（约1-3分钟）

### 2. 创建云托管服务

1. 在云托管控制台，点击"新建服务"
2. 填写服务配置：
   - 服务名称：`ai-course-server`
   - 镜像仓库：选择"使用微信云托管提供的镜像仓库"
   - 服务端口：`80`（与 Dockerfile 中的 EXPOSE 保持一致）
3. 点击"确定"创建服务

### 3. 配置服务器地址

部署完成后，获取云托管服务的访问地址：

1. 在云托管控制台找到你的服务
2. 复制服务的默认域名（格式：`https://your-service-id.service.tcloudbase.com`）
3. 打开 `miniprogram/app.js` 文件
4. 将 `serverUrl` 替换为你的云托管服务地址：

```javascript
globalData: {
  serverUrl: 'https://your-service-id.service.tcloudbase.com',
  // ...
}
```

### 4. 部署后端服务

有两种方式部署后端服务：

#### 方式一：使用微信开发者工具部署

1. 在微信开发者工具中，点击"云开发"按钮
2. 进入"云托管"标签页
3. 选择你创建的服务
4. 点击"上传代码"
5. 选择项目根目录
6. 等待构建和部署完成

#### 方式二：使用命令行部署

```bash
# 安装微信云托管 CLI 工具
npm install -g @cloudbase/cli

# 登录云托管
tcb login

# 部署服务
tcb run deploy --service-name ai-course-server
```

### 5. 环境变量设置（可选）

如果需要配置环境变量（如数据库连接等）：

1. 在云托管控制台，选择你的服务
2. 进入"环境变量"设置
3. 添加需要的环境变量
4. 保存并重新部署服务

### 6. 数据库配置（可选）

当前项目使用内存存储订单数据（仅用于演示）。生产环境建议使用数据库：

#### 使用云数据库 MySQL

1. 在云开发控制台，开通"云数据库 MySQL"
2. 创建数据库实例
3. 创建 `orders` 表：

```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_no VARCHAR(50) UNIQUE NOT NULL,
  items JSON NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  total_count INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  pay_time DATETIME,
  INDEX idx_order_no (order_no),
  INDEX idx_create_time (create_time)
);
```

4. 在云托管服务中配置环境变量：
   - `DB_HOST`: 数据库主机地址
   - `DB_PORT`: 数据库端口
   - `DB_USER`: 数据库用户名
   - `DB_PASSWORD`: 数据库密码
   - `DB_NAME`: 数据库名称

5. 修改 `server.js` 使用 MySQL 存储（参考 mysql2 文档）

### 7. 验证部署

1. 在云托管控制台查看服务状态，确保服务正在运行
2. 访问健康检查接口：`https://your-service-id.service.tcloudbase.com/`
3. 应该返回类似以下的 JSON 响应：

```json
{
  "status": "ok",
  "message": "AI Course Server is running",
  "timestamp": "2025-12-11T06:18:23.382Z"
}
```

4. 在微信开发者工具中测试小程序功能

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

### 后端服务本地调试

```bash
# 安装依赖
npm install

# 启动服务器
npm start
```

服务器将在 `http://localhost:80` 上运行。

### 小程序本地调试

1. 确保已配置好服务器地址（开发环境可以使用 `http://localhost:80`）
2. 在微信开发者工具中打开项目
3. 点击"编译"按钮
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
- ⚠️ **服务器安全** - 生产环境需要配置合理的访问控制和请求验证
- ⚠️ **数据安全** - 使用数据库存储敏感数据，避免使用内存存储

### 项目配置

- 本项目使用的AppID (`wx3b4a96add4a64565`) 仅为示例
- 实际使用时需要替换为你自己的AppID
- 云托管服务地址需要替换为你自己的服务地址

### 开发建议

- 使用真机调试测试支付流程
- 定期备份数据库数据
- 开发环境和生产环境使用不同的云托管服务
- 配置服务监控和日志告警

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

1. **安装微信支付SDK**
   ```bash
   npm install tenpay
   ```

2. **修改 server.js 集成支付**
   - 实现统一下单接口
   - 处理支付回调
   - 更新订单状态

3. **修改小程序支付流程**
   - 调用后端获取支付参数
   - 使用 `wx.requestPayment()` 发起支付
   - 处理支付结果

### 参考文档

- [微信支付开发文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)
- [小程序支付接入指引](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)

## 📝 技术栈

- 微信小程序原生框架
- 微信云托管
- Node.js + Express
- Docker 容器化部署

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License

## 📧 联系方式

如有问题，欢迎通过GitHub Issues联系。

---

**祝你开发愉快！** 🎉