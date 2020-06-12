// 引入mongoose第三方模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    author: {       // 作者
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {      // 文章内容
        type: String,
        required: true,
        minlength: 1,
        maxlength: 9999
    },
    publishDate: {  // 发布时间
        type: Date,
        default: Date.now()
    },
    picture: {      // 图片路径
        type: String,
        default: null
    },
    support: [{     // 点赞
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }],
    comment: [{     // 评论
        author: {       // 作者
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        content: {  // 评论内容
            type: String,
            required: true,
            minlength: 1,
            maxlength: 140
        },
        publishDate: {  // 评论时间
            type: Date,
            default: Date.now()
        }
    }]
});

// 创建文章集合
const Article = mongoose.model('Article', articleSchema);

// 将集合规则作为模块成员进行导出
module.exports = {
    Article
};