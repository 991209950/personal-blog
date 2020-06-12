// 用户构造函数
const { User } = require('../../../model/user');
// 消息构造函数
const { News } = require('../../../model/news');

module.exports = async (req, res) => {
    // 接收用户传递的好友id
    let { id } = req.body;
    // 通过session读取用户id
    let uid = req.session.uid;
    if(!uid) {
        return res.send('请先登录');
    }
    if(id == uid) {
        return res.send({
            state: 'no',
            message: '你不能添加自己为好友！'
        });
    }
    var user = await User.findOne({_id: uid});
    if(user.friends.some(item => item.id == id)) {
        return res.send({
            state: 'no',
            message: '对方已是你的好友！'
        });
    }
    var news = await News.findOne({
        uid: id,
        newsType: 'addFriendsRequest',
        targetID: uid,
        state: 1
    });
    if(news) {
        return res.send({
            state: 'no',
            message: '你已经请求过一次了'
        });
    }
    await News.create({
        uid: id,
        newsType: 'addFriendsRequest',
        targetID: uid,
        content: '2'
    });
    res.send({
        state: 'ok'
    });
}