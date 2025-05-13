const db = require('../db/index')

// 发布文章
exports.addArticle = (req, res) => {
    const data = req.body
    const is_public = req.auth.is_admin || 0 // 默认为 0，如果未提供 is_public，则使用 defaultValue 

    // 从连接池获取一个连接
    db.getConnection((connErr, connection) => {
        if (connErr) return res.cc(connErr)

        // 开始事务
        connection.beginTransaction((err) => {
            if (err) {
                connection.release()
                return res.cc(err)
            }

            const sql = 'insert into articles (user_id, title, content, is_public) values (?, ?, ?, ?)' 
            connection.query(sql, [req.auth.id, data.title, data.content, is_public], (queryErr, results) => {
                if (queryErr) {
                    return connection.rollback(() => {
                        connection.release()
                        res.cc(queryErr)
                    })
                }

                const sql2 = 'insert into categories (name, description, created_by) values (?, ?, ?)'
                connection.query(sql2, [data.categories_name, data.categories_description, req.auth.id], (queryErr2, results2) => {
                    if (queryErr2) {
                        return connection.rollback(() => {
                            connection.release()
                            res.cc(queryErr2)
                        })
                    }

                    const sql3 = 'insert into types ( name, description, created_by ) values (?, ?, ?)'
                    connection.query(sql3, [data.types_name, data.types_description, req.auth.id], (queryErr3, results3) => {
                        if (queryErr3) {
                            return connection.rollback(() => {
                                connection.release()
                                res.cc(queryErr3)
                            })
                        }

                        const sql4 = 'insert into article_categories (article_id, category_id) values (?,?)'
                        connection.query(sql4, [results.insertId, results2.insertId], (queryErr4, results4) => {
                            if (queryErr4) {
                                return connection.rollback(() => {
                                    connection.release();
                                    res.cc(queryErr4);
                                })
                            }

                            const sql5 = 'insert into article_types (article_id, type_id) values (?,?)'
                            connection.query(sql5, [results.insertId, results3.insertId], (queryErr5, results5) => {
                                if (queryErr5) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.cc(queryErr5);
                                    })
                                }
                                // 提交事务
                                connection.commit((commitErr) => {
                                    connection.release();
                                    if (commitErr) {
                                        return res.cc(commitErr)
                                    }
                                    res.cc('发布文章成功', 0)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

// 获取用户自己的文章
exports.getUserArticleList = (req, res) => {
    const sql = 'select * from articles where user_id = ?'
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取用户文章列表成功',
            data: results
        })
    })
}

// 根据id获取文章详情的路由
exports.getArticleById = (req, res) => {
    // const sql = 'select * from articles where id = ?'
    // db.query(sql, req.params.id, (err, results) => {
    //     if (err) return res.cc(err)
    //     if (results.length === 0) return res.cc('文章不存在')
    //     res.send({
    //         status: 0,
    //         message: '获取文章详情成功',
    //         data: results[0]
    //     })
    // })
    console.log(req.params.id)
}
