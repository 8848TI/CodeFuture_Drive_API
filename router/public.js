const express = require('express')
const router = express.Router()

const public_handler = require('../router_handler/public')

// 获取所有公有文章
router.get('/articlelist', public_handler.getArticleList)


module.exports = router