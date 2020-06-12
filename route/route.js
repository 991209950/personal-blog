// 引入express框架
const express = require('express');
// 创建路由
const route = express.Router();

// 渲染登录页面
route.get('/login.html', (req, res) => {
    res.render('login.html');
    // res.send('ok');
})

// 渲染用户页面
route.get('/index.html', (req, res) => {
    res.render('index.html');
    // res.send('ok');
})

// 渲染用户注册页面
route.get('/register.html', (req, res) => {
    res.render('register.html');
})

// 渲染用户消息页面
route.get('/news.html', (req, res) => {
    res.render('news.html')
})


module.exports = route;