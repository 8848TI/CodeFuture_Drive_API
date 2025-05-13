// 导入 joi 模块, 用于数据验证
const joi = require('joi')

const password = joi.string().min(6).max(12).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{6,12}$/).required()

// 定义用户名和密码的验证规则
module.exports = {
    update_userinfo_schema: {
        body: {
            id: joi.number().integer().min(1).required(),
            nickname: joi.string().required(),
            email: joi.string().email().required(),
        }
    },
    update_password_schema: {
        body: {
            oldPwd: password,
            newPwd: joi.not(joi.ref('oldPwd')).concat(password).required()
        }
    },
    update_avatar_schema: {
        body: {
            avatar: joi.string().dataUri().required()
        }
    }
}

