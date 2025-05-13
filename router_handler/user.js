const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// Github授权登录成功的回调函数
// exports.authSuccess = (req, res) => {
//     // 登录成功后，生成 JWT 的 Token 字符串
//     const user = { ...req.user } // 这里的 req.user 是 Passport 插件帮我们挂载上去的，它的值就是用户的信息对象
//     user.password = '' // 剔除密码
//     const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn }) // 生成 Token 字符串
//     // 认证成功后，执行回调函数
//     res.redirect('/') // 重定向到主页
// }

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // // 获取客户端提交到服务器的用户信息
    const userinfo = req.body

    // 是否有重复用户名
    const sqlSelect = `select * from users where username=?`
    db.query(sqlSelect, [userinfo.username], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 定义插入新用户的 SQL 语句
        const sqlInsert = 'insert into users set ?'
        // 调用 db.query() 执行 SQL 语句，插入新用户
        db.query(sqlInsert, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 执行 SQL 语句失败
            if (err) {
                return res.cc(err)
            }
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册用户成功
            res.cc('注册成功！', 0)
        })
    })
    
}

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // 定义根据用户名查询用户的 SQL 语句
    const sqlSelect = `select * from users where username=?`
    // 执行 SQL 语句查询用户数据
    db.query(sqlSelect, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) {
            return res.cc('登录失败！')
        }
        // 判断用户输入的登录密码是否和数据库中的密码一致
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        // 在服务器端生成 Token 字符串
        const user = {...results[0], password: '', pic_user: '' } // 剔除密码
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn }) // 生成 Token 字符串
        // 将生成的 Token 字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            // 是否是管理员
            is_admin: results[0].is_admin,
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr
        })
    })
}