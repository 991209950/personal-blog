// 引入express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入dateformat第三方模块，用来处理时间
const dateFormat = require('dateformat');
// 导入express-session模块，处理判断登录状态
const session = require('express-session');
// 导入morgan第三方模块
const morgan = require('morgan');

// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');

// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}));
// 配置session
app.use(session({secret: 'secret key'}));

// 告诉express框架模板的所在默认位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀
// app.set('view engine', 'art');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
// app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'))

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 打印客户端请求
app.use(morgan('dev'))

// 引入路由模块
const route = require('./route/route');

// ajax请求
app.use('/ajax', require('./route/ajax'));

// 拦截请求，判断登录状态
app.use(require('./middleware/loginGuard'));

// 将用户请求转移到路由模块
app.use(route);

// 监听端口
app.listen(3001);
console.log('网站服务器启动成功');