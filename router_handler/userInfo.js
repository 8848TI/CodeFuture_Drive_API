const db = require('../db/index')
const bcrypt = require('bcryptjs')

module.exports.getUserInfo = (req, res) => {
    const sqlSelect = `select id, username, nickname, email, user_pic from users where id=?`
    db.query(sqlSelect, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // console.log(results[0])
            res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}

module.exports.updateUserInfo = (req, res) => {
    const sqlUpdate = `update users set ? where id=?`
    db.query(sqlUpdate, [req.body, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户基本信息失败！')
        return res.cc('更新用户基本信息成功！', 0)
    })
}

module.exports.updatePassword = (req, res) => {
    const sqlSelect = `select * from users where id=?`
    db.query(sqlSelect, req.auth.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在！')
        // // 调用bcrypt.compareSync()比较密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误！')
        const sqlUpdate = `update users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlUpdate, [newPwd, req.auth.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows!== 1) return res.cc('更新密码失败！')
            return res.cc('更新密码成功！', 0)
        })
    })
}

module.exports.updateAvatar = (req, res) => {
    console.log(req.body)
    const sqlUpdate = `update users set user_pic=? where id=?`
    db.query(sqlUpdate, [req.body.avatar, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows!== 1) return res.cc('更新头像失败！')
        return res.cc('更新头像成功！', 0)
    })
}
