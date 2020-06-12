// 用户集合构造函数
const { User } = require('../../../model/user');
// 消息集合构造函数
const { News } = require('../../../model/news');

module.exports = async (req, res) => {
    if (req.body.message == 'true') {
        // 查询该条消息
        var news = await News.findOne({ _id: req.body.id });
        if(news.content != '2') {
            return res.status(400).send('不能重复提交')
        }
        // 向用户信息内添加好友
        await User.updateOne({ _id: news.uid }, {
            $addToSet: {
                "friends": {
                    name: '未命名好友',
                    id: news.targetID
                }
            }
        });
        await User.updateOne({ _id: news.targetID }, {
            $addToSet: {
                "friends": {
                    name: '未命名好友',
                    id: news.uid
                }
            }
        });
        // 修改消息内容
        await News.updateOne({ _id: req.body.id }, { content: '1' });
    } else if (req.body.message == 'false') {
        // 修改消息内容
        await News.updateOne({ _id: req.body.id }, { content: '0' });
    } else {
        return res.status(400).send('请求有误');
    }
    res.send('ok');
}