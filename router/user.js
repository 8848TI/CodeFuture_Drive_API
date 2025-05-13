const express = require('express')
const router = express.Router()
// 导入验证规则对象
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// const passport = require('passport')

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user')

router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser) // 注册新用户的路由
router.post('/login', expressJoi(reg_login_schema), user_handler.login) // 登录的路由

// Github授权登录路由
// router.get('/8848TI/github', passport.authenticate('github')) // 授权登录的路由
// router.get('/8848TI/github/login', passport.authenticate('github', { failureRedirect: '/login' }), userinfo_handler.authSuccess) // 授权登录成功的回调路由

module.exports = router