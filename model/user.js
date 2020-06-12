// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi验证模块
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {     // 账号
        type: String,
        unique: true,   // 唯一性
        required: true, // 必填字段
        minlength: 6,   // 最小长度
        maxlength: 6    // 最大长度
    },
    nickname: {     // 昵称
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16,
    },
    password: {     // 密码
        type: String,
        required: true
    },
    telephone: {    // 手机号
        type: String,
        unique: true,
        required: true
    },
    sex: {          // 性别
        type: String,
        default: null
    },
    birthday: {     // 出生日期
        type: Date,
        default: null
    },
    regdate:{       // 注册日期
        type: Date,
        default: Date.now()
    },
    friends: [{     // 好友
        name: {     // 好友备注
            type: String
        },
        id: {       // 好友id
            type: mongoose.Schema.Types.ObjectId,   // 数据库中_id字段的属性
            require: true,
            ref: 'User'     // 关联文档
        }
    }],
    problem: {      // 密保问题
        type: String,
        default: '我的手机号？'
    },
    answer: {       // 密保答案
        type: String,
        default: null
    },
    role: {         // 角色 admin超级管理员 normal普通用户
        type: String,
        default: 'normal'
    },
    state: {    // 账号状态
        type: Number,
        default: 0
    }
});

// 创建用户集合
const User = mongoose.model('User', userSchema);

// 创建一个用户
async function createUser () {
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // 对c123456789进行加密
    const pass = await bcrypt.hash('c123456789', salt);
    console.log(pass)
    const user = await User.create({
        username: '123456',
        nickname: 'root',
        friends: [{
            name: '二狗',
            id: '5e500831511c752eecadfb7e'
        }],
        password: pass,
        telephone: '13123456789',
        sex: 'male',
        role: 'admin'
    });
    console.log(user)
}

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象验证规则
    const schema = {
        username: Joi.string().regex(/^[0-9]{6}$/).error(new Error('账号不符合验证规则')),
        nickname: Joi.string().min(2).max(16).required().error(new Error('昵称不符合验证规则')),
        password: Joi.string().regex(/^[A-Za-z0-9_]{8,16}$/).regex(/[A-Za-z_][0-9]|[0-9][a-zA-Z_]/).error(new Error('密码不符合验证规则')),
        telephone: Joi.string().regex(/^1[35678][0-9]{9}$/).error(new Error('手机号不符合验证规则'))
    }
    // 实施验证
    return Joi.validate(user, schema);
}

// 将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
}