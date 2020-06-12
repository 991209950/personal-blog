// 发送请求更多文章
function moreArticle(obj, page) {
    page = page ? page : 1;
    $.get('/ajax/articles', { page: page }, function (data) {
        // console.log(data);
        if (page == 1) {
            obj.articleList = [];
            obj.articlesPage = 1;
        }
        obj.articleList = obj.articleList.concat(data.records);
        if (data.page >= data.pages) {
            obj.moreBtn = '没有更多了';
            obj.ismoreBtn = true;
        } else {
            obj.moreBtn = '点击加载更多';
            obj.ismoreBtn = false;
        }
    })
}
// 好友请求模板
const Request = {
    props: ['requestList'],
    template: `
    <ul class="list-group">
        <li :key="item._id" class="list-group-item" v-for="item in requestList">
            <p>
                {{item.targetID.nickname}} 请求添加你为好友
            </p>
            <p v-if="item.content == '2'">
                <button @click='$emit("agree", item._id)' type="button" class="btn btn-primary btn-sm">同意</button>
                <button @click='$emit("refuse", item._id)' type="button" class="btn btn-default btn-sm">拒绝</button>
            </p>
            <p v-else-if="item.content == 1">已同意</p>
            <p v-else-if="item.content == 0">已拒绝</p>
        </li>
    </ul>`
};
// 与我相关模板
const Related = {
    props: ['relatedList'],
    template: `
    <ul class="list-group">
        <li :key="item._id" class="list-group-item" v-for="item in relatedList">
            <p>
                {{item.targetID.nickname}}评论了你的说说
            </p>
            <p>
                {{item.targetID.nickname}}：{{item.content}}
            </p>
        </li>
    </ul>`
};

// 创建路由实例对象
var router = new VueRouter({
    // 创建路由规则
    routes: [
        { path: '/', redirect: '/request' },
        { path: '/request', component: Request },
        { path: '/related', component: Related }
    ]
});

var cont = new Vue({
    el: '#cont',
    data: {
        user: '',           // 用户昵称
        friendList: {},     // 好友列表
        requestList: [],    // 添加好友请求消息列表
        relatedList: [],    // 与我相关消息列表
        lookupInp: '',      // 搜索用户输入框双向数据绑定
        isAddFriend: true,  // 添加好友页面是否隐藏
        hint: '',           // 添加好友提示信息
        isLookupList: true, // 搜索用户列表是否隐藏
        lookupList: {},     // 搜索用户列表
        routerBtn: true     // 路由按钮样式，true为选中好友请求，false为选中与我相关
    },
    methods: {
        // 用户点击同意或拒绝时
        handle: function (id, message) {
            $.post('/ajax/handle', {
                id: id,
                message: message
            }, function (data) {
                console.log(data);
            })
        },
        // 用户查找搜索按钮点击事件
        lookupBtn: function () {
            var reg = /^[0-9]{6,11}$/;
            if (!reg.test(this.lookupInp)) {
                return this.hint = '账号或手机号输入格式错误';
            }
            this.hint = '';
            var that = this;
            $.get('/ajax/lookup', {
                username: this.lookupInp
            }, function (data) {
                // console.log(data);
                if (data) {
                    that.lookupList = data;
                    that.isLookupList = false;
                } else {
                    that.isLookupList = true;
                    that.hint = '没有找到该用户！';
                }
            })
        },
        // 添加好友按钮点击事件
        addFriendBtn: function () {
            var that = this;
            $.post('/ajax/addFriend', {
                id: this.lookupList.id
            }, function (data) {
                if (data.state == 'no') {
                    alert(data.message);
                } else if (data.state == 'ok') {
                    // 暂时定为弹出框
                    alert('已发送请求');
                    that.isAddFriend = true;
                }
            })
        }
    },
    mounted: function () {
        // console.log(111)
        var that = this;
        // 请求用户名
        $.get('/ajax/index', function (data) {
            that.user = data;
        });
        // 请求好友列表
        $.get('/ajax/friends', function (data) {
            that.friendList = data
        });
        // 请求消息列表
        $.get('/ajax/newsList', function (data) {
            console.log(data);
            that.requestList = data.requestList;
            that.relatedList = data.relatedList;
        })
    },
    router: router      // 路由模块
});