// 用户集合构造函数
const { User } = require('../../../model/user');
// 文章集合构造函数
const { Article } = require('../../../model/article');
// 导入mongoose-sex-page数据分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 判断用户登录状态
    if (!req.session.uid) {
        return res.status(400).send('您还没有登录');
    }

    // 查询用户
    let user = await User.findOne({username: req.session.username});
    // 将用户的id添加到数组中
    let friends = [req.session.uid];
    // 将用户好友添加到friends中
    user.friends.every(function(item) {
        friends.push(item.id);
        return true;
    });

    // 接收用户出传递的页数
    let page = req.query.page || 1;

    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // let aaa = await Article.find({author: {$in: friends}}).sort({_id: -1}).populate({
    //     path: 'author',// 关联的字段
    //     select: 'nickname'// 需要显示的字段（_id 字段默认显示）
    //     // 简写为 .populate('author', 'nickname')
    // });
    // $in 查询包含数组内任意一条数据的字段
    // sort:[['_id', -1]] 按_id逆向排序
    let articles = await pagination(Article).find({author: {$in: friends}}).sort({_id: -1}).page(page).size(10).display(3).populate('author', 'nickname').populate('comment.author', 'nickname').exec();
    res.send(articles);
}