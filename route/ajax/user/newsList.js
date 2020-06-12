// 消息构造函数
const { News } = require('../../../model/news');

module.exports = async (req, res) => {
    // 通过session读取用户id
    let uid = req.session.uid;
    if(!uid) {
        return res.send('请先登录');
    }
    // 查询添加好友信息(未处理)
    var requestList = await News.find({uid: uid, content: '2', newsType: 'addFriendsRequest'}).populate('targetID','nickname').sort({_id: -1});
    // 查询添加好友信息(已处理)
    requestList = requestList.concat(await News.find({uid: uid, content: {$ne: '2'}, newsType: 'addFriendsRequest'}).populate('targetID','nickname').sort({_id: -1}));

    // 查询与我相关信息
    var relatedList = await News.find({uid: uid, newsType: 'comment'}).populate('targetID','nickname').populate('articleID').sort({_id: -1});

    // 将所有未阅读的数据修改为已阅读
    await News.updateMany({uid: uid, state: 1}, {state: 0});

    res.send({
        requestList,
        relatedList
    });
}