// 检测用户选择文件类型的函数
function checkImg(elem) {
    var img_id = elem.value; //根据id得到值
    var index = img_id.indexOf("."); //得到"."在第几位
    img_id = img_id.substring(index); //截取"."之后的，得到后缀
    console.log(img_id)
    if (img_id != ".png" && img_id != ".gif" && img_id != ".jpg" && img_id != ".jpeg" && img_id != ".JPG" && img_id != ".PNG" && img_id != ".GIF" && img_id != ".JPEG") {  //根据后缀，判断是否符合图片格式
        alert("不是指定图片格式,重新选择");
        elem.value = "";  // 不符合，就清除，重新选择
        return false;
    }
    return true;
}
// 发送请求更多文章
function moreArticle(obj, page) {
    page = page ? page : 1;
    $.get('/ajax/articles', { page: page }, function (data) {
        // console.log(data);
        if(page == 1) {
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

var cont = new Vue({
    el: '#cont',
    data: {
        user: '',          // 用户昵称
        friendList: {},     // 好友列表
        articleList: [],    // 好友动态列表
        isHidden: true, // 选择图片显示
        imgSrc: '',         // 图片路径
        content: '',        // 发表新文章的文本域双向数据绑定
        moreBtn: '点击加载更多',    // 加载更多按钮内容
        ismoreBtn: false,   // 加载更多按钮控制是否可以点击 false可以点击
        articlesPage: 1,    // 好友动态展示页码
        lookupInp: '',      // 搜索用户输入框双向数据绑定
        isAddFriend: true,  // 添加好友页面是否隐藏
        hint: '',           // 添加好友提示信息
        isLookupList: true, // 搜索用户列表是否隐藏
        lookupList: {},     // 搜索用户列表
        newsNumber: 0
    },
    methods: {
        // 用户选择文件后浏览功能
        complete: function (event) {
            console.log('用户选择图片完成');
            // console.log(event.srcElement.files.length);
            var that = this;
            if (event.srcElement.files.length == 0 || !checkImg(event.srcElement)) {
                // 如果用户没有选择图片或选择的文件不是指定格式
                // 清除用户选择的文件，并把图片展示盒子隐藏
                this.isHidden = true;
                this.imgSrc = '';
            } else {
                // 创建文件读取对象
                var reader = new FileReader();
                // 读取文件
                reader.readAsDataURL(event.srcElement.files[0]);
                // 监听onload事件
                reader.onload = function () {
                    that.imgSrc = reader.result;
                    that.isHidden = false;
                    console.log('图片加载完成')
                }
            }
        },
        // 发表新文章
        publish: function () {
            var that = this;
            // 获取选择文件标签
            var myFile = document.getElementById('myFile');
            if (!this.content) {
                return alert('请输入发表内容');
            }
            // 创建空的formData对象
            var formData = new FormData();
            // 将用户输入的内容添加到formData对象中
            formData.append('content', this.content);
            // 判断用户是否选择了文件
            if (myFile.files.length) {
                // 将用户选择的文件添加到formData对象中
                formData.append('myFile', myFile.files[0]);
            }
            // 创建ajax对象
            var xhr = new XMLHttpRequest();
            // 对ajax对象进行配置
            xhr.open('post', '/ajax/addArticle');
            // 发送ajax请求
            xhr.send(formData);
            // 监听xhr对象下面的onload事件
            xhr.onload = function () {
                if (xhr.status == 200) {
                    that.content = '';
                    that.isHidden = true;
                    myFile.value = '';
                    console.log(xhr.responseText);
                    moreArticle(that);
                }
            }
        },
        // 点击加载更多按钮
        moreArticleBtn: function () {
            if (!this.ismoreBtn) {
                this.articlesPage += 1;
                moreArticle(this, this.articlesPage);
            }
        },
        // 点赞按钮
        addSupport: function (id, index) {
            var that = this;
            // console.log(index)
            $.get('/ajax/addSupport', { id: id }, function (data) {
                // console.log(data)
                that.articleList.splice(index, 1, data);
            })
        },
        // 评论发表
        addComment: function (id, index) {
            // console.log(this.articleList[index].commentInput);
            // console.log(id);
            var that = this;
            $.post('/ajax/addComment', {
                id: id,
                comment: this.articleList[index].commentInput
            }, function(data) {
                that.articleList.splice(index, 1, data);
                // console.log(data);
            })
        },
        // 用户查找搜索按钮点击事件
        lookupBtn: function() {
            var reg = /^[0-9]{6,11}$/;
            if(!reg.test(this.lookupInp)) {
                return this.hint = '账号或手机号输入格式错误';
            }
            this.hint = '';
            var that = this;
            $.get('/ajax/lookup', {
                username: this.lookupInp
            }, function(data) {
                // console.log(data);
                if(data) {
                    that.lookupList = data;
                    that.isLookupList = false;
                }else {
                    that.isLookupList = true;
                    that.hint = '没有找到该用户！';
                }
            })
        },
        // 添加好友按钮点击事件
        addFriendBtn: function() {
            var that = this;
            $.post('/ajax/addFriend', {
                id: this.lookupList.id
            },function(data) {
                if(data.state == 'no') {
                    alert(data.message);
                }else if(data.state == 'ok') {
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
            that.friendList = data;
        });
        // 请求动态展示
        moreArticle(this);
        // 请求消息列表
        $.get('/ajax/newsNumber', function (data) {
            that.newsNumber = parseInt(data);
            console.log(data);
        })
    }
});