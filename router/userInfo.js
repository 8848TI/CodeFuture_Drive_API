const express = require('express')
const router = express.Router()
// 导入验证规则对象
const expressJoi = require('@escook/express-joi')

// 导入用户信息的路由处理函数模块
const userInfo_handler = require('../router_handler/userinfo')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/userInfo')

// 获取用户信息
router.get('/userinfo', userInfo_handler.getUserInfo)
// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfo_handler.updateUserInfo)
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userInfo_handler.updatePassword)
// 更新头像
router.post('/update/avatar', userInfo_handler.updateAvatar)


module.exports = router