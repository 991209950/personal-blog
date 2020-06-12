const guard = (req, res, next) => {
    if(req.session.username) {
        // 用户是登录状态 将请求放行
        // console.log(req.session)
        next();
    }else if(req.url == '/login.html' || req.url == '/register.html'){
        // 如果用户访问的是登录页面 注册页面   将请求放行
        next();
    }else {
        res.redirect('/login.html');
    }
}
module.exports = guard;