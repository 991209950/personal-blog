// 引入用户构造函数
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
    // 接收用户出传递的用户id
    let username = req.query.username;
    let user = await User.findOne({username: username});
    user = user ? user : await User.findOne({telephone: username});
    // 将查询出来的用户信息处理后返回给客户端
    if(user){
        res.send({
            id: user._id,
            username: user.username,
            nickname: user.nickname
        });
    }else {
        res.send(null);
    }
    
}