const db = require('../db/index')

// 获取公用文章列表
exports.getArticleList = (req, res) => {
  const sql = `select * from articles where is_public = 1`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results,
    })
  })
}