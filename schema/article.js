// 导入 joi 模块, 用于数据验证
const joi = require('joi')

// 定义文章字段的验证规则
const title = joi.string().required() // 文章标题字段的验证规则
const content = joi.string().required().allow('') // 允许文章内容为空字符串

const categories_name = joi.string().required() // 分类名称字段的验证规则
const categories_description = joi.string().required() // 描述字段的验证规则

const types_name = joi.string().required() // 分类名称字段的验证规则
const types_description = joi.string().required() // 描述字段的验证规则



module.exports = {
  // 发布文章的验证规则对象
  add_article_schema: {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      title,
      content,
      categories_name,
      categories_description,
      types_name,
      types_description,
    }
  }
}