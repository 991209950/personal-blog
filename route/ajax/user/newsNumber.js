// 消息构造函数
const { News } = require('../../../model/news');

module.exports = async (req, res) => {
    // 通过session读取用户id
    let uid = req.session.uid;
    if(!uid) {
        return res.send('请先登录');
    }
    res.send(await (await News.countDocuments({uid: uid, state: 1})).toString());
}