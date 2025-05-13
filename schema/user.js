// 导入 joi 模块, 用于数据验证
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().min(6).max(20).pattern(/^[A-Za-z0-9]{6,20}$/).required()
const password = joi.string().min(6).max(12).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{6,12}$/).required()

module.exports = {
  // 注册和登录表单的验证规则对象
  reg_login_schema: {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      username,
      password
    }
  },
}