// 文章集合构造函数
const { Article } = require('../../../model/article');
// 消息集合构造函数
const { News } = require('../../../model/news');

module.exports = (req, res) => {
    // 判断用户登录状态
    if (!req.session.uid) {
        return res.status(400).send('您还没有登录');
    }
    // res.send(req.body);
    // 接收用户传递post请求的参数
    let body = req.body;
    // 通过session读取用户id
    let uid = req.session.uid;
    // 将评论信息添加到数据库中
    Article.updateOne({ _id: body.id }, { $addToSet: { "comment": { author: uid, content: body.comment } } }, async function (err) {
        if (err) {
            console.log(err);
            res.status(400).send('no');
        } else {
            // 查询添加评论的当前文章，并返回
            let test = await Article.findOne({ _id: body.id }).populate('author', 'nickname').populate('comment.author', 'nickname');
            console.log(test.author._id)
            // 添加消息
            if (test.author._id != uid) {
                News.create({
                    uid: test.author._id,
                    newsType: 'comment',
                    targetID: uid,
                    articleID: test._id,
                    content: body.comment
                })
            }

            res.send(test);
        }
    });
}