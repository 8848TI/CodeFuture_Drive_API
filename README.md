# CodeFuture_Drive_API

🔧 CodeFuture_Drive 项目的后端服务，基于 **Node.js + Express + MySQL** 构建，支持 JWT 身份认证、GitHub 第三方登录、图像上传、博客管理等功能。

> 前端仓库地址：[CodeFuture_Drive](https://github.com/8848TI/CodeFuture_Drive)

---

## 🧰 技术栈

- **Node.js** + **Express 5**
- **MySQL**（使用 `mysql2` 连接）
- **JWT** 身份认证（`jsonwebtoken + express-jwt`）
- **GitHub OAuth 登录**（`passport + passport-github2`）
- **表单校验**：Joi + @escook/express-joi
- **文件上传**：`multer` + 阿里云 OSS（`ali-oss`）
- **Session 支持**：`express-session`



## 📁 项目结构说明

本项目采用模块化开发，每个功能模块拆分为三层：

- `router/` 路由层：定义接口地址和请求方式；
- `router_handler/` 控制器层：处理具体业务逻辑；
- `schema/` 校验层：使用 `joi` 进行参数验证；
- `db/` 数据库连接：基于 mysql2 的连接池；
- `utils/` 工具函数，如 `md5()` 加密、OSS 工具等；
- `uploads/` 本地上传文件保存目录（若未使用 OSS）；

> 使用 `app.js` 作为应用启动入口，统一注册中间件与路由。



## 📦 安装与运行

### 1. 克隆项目

```
git clone https://github.com/8848TI/CodeFuture_Drive_API.git
cd CodeFuture_Drive_API
```



### 2. 安装依赖

```
pnpm install
or
npm install
```



### 3.修改数据库账号密码

```
- db/index.js下
  host: 'localhost',
  user: '您的账号',
  password: '您的密码',
  database: '您的数据库名'
```



## 🚀 启动服务

```
node app
```

默认运行在：`http://localhost:3007`