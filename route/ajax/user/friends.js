// 用户集合构造函数
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
    // 接收客户端传递过来的页数
    let page = req.query.page || 1;
    // 每页显示的数据条数
    let pagesize = 10;
    // 最多显示的页码
    let display = 3;
    // 查询用户好友
    let user = await User.findOne({username: req.session.username}).populate('friends.id', ['name', 'nickname']);
    let friends = user.friends;
    // 总页数
    let total = Math.ceil(friends.length / pagesize);
    // 每页显示的数据
    friends = friends.slice(pagesize * (page - 1), pagesize * page - 1);
    // 需要显示的页码
    let pages = [];
    for(let i = 1; i <= total; i ++) {
        pages.push(i);
        if(i > display){
            pages.shift();
        }
    }

    res.send({
        page: page,
        total: total,
        friends: friends,
        pages: pages
    });
    // res.send('ok');
}