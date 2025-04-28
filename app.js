const express = require('express')
const app = express()

// 解决跨域问题
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意：这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // 解析 json 格式的表单数据

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


app.listen('3007', () => {
  console.log('server running at http://127.0.0.1:3007')
})