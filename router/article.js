const express = require('express')
const router = express.Router()
// 导入验证规则对象
const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')
const article_handler = require('../router_handler/article')

// 发布新文章的路由
router.post('/add', expressJoi(add_article_schema), article_handler.addArticle)
// 获取用户自己的文章
router.get('/list', article_handler.getUserArticleList)
// 根据id获取文章详情的路由
router.get('/:id', article_handler.getArticleById)
// // 根据id更新文章的路由
// router.post('/update/:id', article_handler.updateArticleById)
// // 根据id删除文章的路由
// router.get('/delete/:id', article_handler.deleteArticleById)

module.exports = router