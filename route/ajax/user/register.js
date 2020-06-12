// 用户集合构造函数，验证函数
const { User, validateUser } = require('../../../model/user');
// 引入随机数生产函数
const suiji = require('../../../model/jisuan');
// 引入加密模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    // 接收客户端传递的参数
    var body = req.body;
    // 通过手机号查询数据库中有没有该账号
    var user = await User.findOne({telephone: body.telephone});
    if(user) {
        // 如果有该账号，返回no
        return res.send({
            state: 'no',
            message: '手机号已存在'
        });
    }
    // 查询数据库中所有用户个数，然后通过随机数函数生成账号
    var username = suiji(await User.estimatedDocumentCount());
    // 将生成的账号添加到body对象中
    body.username = username;
    // 验证body对象是否符合验证规则
    try{
        await validateUser(body);
    }catch(e) {
        // 验证没有通过
        // 将提示信息返回
        return res.send({
            state: 'err',
            message: e.message
        });
    }
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(body.password, salt);
    // 替换密码
    body.password = password;
    // 将用户信息存储到数据库
    await User.create(body);
    
    res.send({
        state: 'ok',
        message: username
    });
}