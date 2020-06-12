// 加密模块
const bcrypt = require('bcryptjs');
// 导入用户集合构造函数
const { User } = require('../../../model/user');
// 导入formidable
const formidable = require('formidable');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        // 接收请求参数
        // return res.send(fields);
        const { username, password } = fields;
        if (username.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).send('账号或密码错误');
        }
        let user = await User.findOne({ username });
        user = user ? user : await User.findOne({ telephone: username });
        if (user) {
            // 查询到用户
            // 将客户端传递过来的密码和用户信息中的密码进行对比
            // 进行密码比对，比对成功返回true，否则返回false
            // console.log(password);
            let isValid = await bcrypt.compare(password, user.password);
            // console.log(isValid);
            if (isValid) {
                // 登录成功
                // 将用户名存储在session中
                req.session.username = user.username;
                // 将用户角色信息存储在session中
                req.session.role = user.role;
                // 将用户昵称存储在session中
                req.session.nickname = user.nickname;
                // 将用户id存储在session中
                req.session.uid = user._id;
                res.send('ok');
            } else {
                // 密码错误
                res.status(400).send('账号或密码错误');
            }
        } else {
            // 没有查询到用户
            res.status(400).send('账号或密码错误');
        }
    })
}