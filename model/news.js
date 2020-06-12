// 引入mongoose第三方模块
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    uid: {          // 用户id，指谁的消息
        type: mongoose.Schema.Types.ObjectId,   // 数据库中_id字段的属性
        required: true, // 必填字段
        ref: 'User'     // 关联文档
    },
    newsType: {     // 消息类型
        type: String,   // addFriendsRequest 添加好友请求  comment 评论
        required: true
    },
    targetID: {     // 目标id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    articleID: {    // 文章id，如果是评论时使用
        type: mongoose.Schema.Types.ObjectId
    },
    content: {      // 如果是评论，评论内容
        type: String    // 如果是好友添加请求拒绝时为0，同意时为1，未同意也未拒绝2
    },
    state: {        // 消息状态，0代表已经阅读，1代表未阅读
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now() // 默认值：现在时间
    }
});

// 创建消息集合
const News = mongoose.model('News', newsSchema);

// 将集合规则当作模块成员导出
module.exports = {
    News
}