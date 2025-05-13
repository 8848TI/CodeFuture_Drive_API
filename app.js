const express = require('express')
const app = express()
const joi = require('joi')
const config = require('./config/config')

// github授权登录配置
// const passport = require('passport')
// const session = require('express-session')
// const setupPassport = require('./config/passport-config')
// app.use(session({
//   secret: 'my-very-secure-and-random-string-1234567890',
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// 解决跨域问题
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 配置一个处理错误的中间件
app.use((req, res, next) => {
  res.cc = function(err, status = 1) {
    res.send({
      status,
      msg: err instanceof Error? err.message : err
    })
  }
  next()
})

// 解析token的中间件
let { expressjwt: jwt } = require("express-jwt")
app.use(
  jwt({
    secret: config.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/api/, /^\/public/]})
)

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userInfo')
app.use('/my', userinfoRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
app.use('/article', articleRouter)
// 导入并使用公用路由模块
const publicRouter = require('./router/public')
app.use('/public', publicRouter)

app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败')
  }
  // 未知的错误
  res.cc(err)

})

app.listen(3007, () => {
  console.log('server running at http://127.0.0.1:3007')
})