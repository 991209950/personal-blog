// 引入formidable模块
const formidable = require('formidable');
// 路径处理模块
const path = require('path');
// 文章构造函数
const { Article } = require('../../../model/article');

module.exports = (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户端上传文件的存储路径
    form.uploadDir = path.join(__dirname, '../', '../', '../', 'public', 'uploads');

    // 保留上传文件的后缀名
    form.keepExtensions = true;
    // 解析客户端传递过来的formData对象
    form.parse(req, async (err, fields, files) => {
        // 1. err 错误对象，如果表单解析失败err里面存储错误信息  如果表单解析成功err为null
        // 2. fields 对象类型  保存普通表单数据
        // 3. files 对象类型  保存了和上传文件相关的数据
        //      files.myFile中的myFile为客户端input的name属性
        if (req.session.uid) {
            var file = files.myFile ? files.myFile.path.split('public')[1] : null
            await Article.create({
                author: req.session.uid,
                content: fields.content,
                picture: file
            })
            res.send('ok');
        } else {
            res.status(400).send('您还没有登录');
        }

    })
}