// 文章集合构造函数
const { Article } = require('../../../model/article');
module.exports = (req, res) => {
    // 判断用户登录状态
    if (!req.session.uid) {
        return res.status(400).send('您还没有登录');
    }
    // 接收用户出传递的文章id
    let id = req.query.id;
    Article.updateOne({_id: id}, {$addToSet: {"support": req.session.uid}}, async function(err) {
        if(err){
            console.log(err);
            res.status(400).send('no');
        }else {
            let test = await Article.findOne({_id: id}).populate('author', 'nickname').populate('comment.author', 'nickname');
            res.send(test);
        }
    });
}
// Friend.update({name:uname},{$pull:{"group": {groupName:"friends"}}},function(err){
//     if(err){
//         res.send(500);
//         console.log(err);
//     }
// })