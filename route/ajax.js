// 引用express框架
const express = require('express');
// 创建ajax路由
const ajax = express.Router();

// 实现登录功能
ajax.post('/login', require('./ajax/user/login'));

// 登录后请求昵称
ajax.get('/index', require('./ajax/user/index'));
// 请求好友文章列表
ajax.get('/articles', require('./ajax/article/articles'));
// 请求好友列表
ajax.get('/friends', require('./ajax/user/friends'));

// 文章发表
ajax.post('/addArticle', require('./ajax/article/addArticle'));

// 添加点赞 
ajax.get('/addSupport', require('./ajax/article/addSupport'));
// 添加评论
ajax.post('/addComment', require('./ajax/article/addComment'));

// 用户注册
ajax.post('/register', require('./ajax/user/register'));

// 添加好友的查找功能
ajax.get('/lookup', require('./ajax/user/lookup'));
// 添加好友请求
ajax.post('/addFriend', require('./ajax/user/addFriend'));

// 请求消息个数
ajax.get('/newsNumber', require('./ajax/user/newsNumber'));
// 请求消息列表
ajax.get('/newsList', require('./ajax/user/newsList'));

// 添加好友处理
ajax.post('/handle', require('./ajax/user/handle'))

module.exports = ajax;
