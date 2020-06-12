$(function () {
    changeSize();
    window.onresize = changeSize;
    function changeSize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        // 背景根据可视区窗口大小自适应
        if (w < 1200) {
            if (240 / h > 680 / 1000) {
                $('.side').css('backgroundSize', '240px auto');
            } else {
                $('.side').css('backgroundSize', 'auto ' + h + 'px');
            }
        } else {
            if (480 / h > 680 / 1000) {
                $('.side').css('backgroundSize', '480px auto');
            } else {
                $('.side').css('backgroundSize', 'auto ' + h + 'px');
            }
        }
    }
});
var cont = new Vue({
    el: '#cont',
    data: {
        nickname: '',
        isNickname: true,
        nicknameErr: '',
        password: '',
        isPassword: true,
        passwordErr: '',
        confirmPassword: '',
        isConfirmPassword: true,
        confirmPasswordErr: '',
        tel: '',
        isTel: true,
        telErr: '',
        isSucceed: true,
        username: '123456'
    },
    methods: {
        // 昵称输入框失去焦点验证
        nicknameBlur: function () {
            var nicknameReg = /[\s]+/;
            if (nicknameReg.test(this.nickname)) {
                this.nicknameErr = '昵称不能包含空白字符';
                this.isNickname = false;
                return false;
            }
            nicknameReg = /^[\S]{1,12}$/;
            if (!nicknameReg.test(this.nickname)) {
                this.nicknameErr = '昵称要输入1 ~ 12个字符或汉字';
                this.isNickname = false;
                return false;
            } 
            this.isNickname = true;
            return true;
        },
        // 密码输入框失去焦点验证
        passwordBlur: function () {
            var passwordReg = /[^a-zA-Z0-9_]+/;
            if (passwordReg.test(this.password)) {
                this.passwordErr = '密码只能包含大小写字母_数字';
                this.isPassword = false;
                return false;
            }
            passwordReg = /^[a-zA-Z0-9_]{8,16}$/;
            if (!passwordReg.test(this.password)) {
                this.passwordErr = '密码要输入8 ~ 16位';
                this.isPassword = false;
                return false;
            }
            passwordReg = /[A-Za-z_][0-9]|[0-9][A-Za-z_]/;
            if (!passwordReg.test(this.password)) {
                this.passwordErr = '密码要同时包含字母或下划线和数字';
                this.isPassword = false;
                return false;
            }
            this.isPassword = true;
            return true;
        },
        // 确认密码输入框失去焦点验证
        confirmPasswordBlur: function() {
            if(this.password !== this.confirmPassword) {
                this.confirmPasswordErr = '两次密码输入不同，请重新输入';
                this.isConfirmPassword = false;
                return false;
            }
            this.isConfirmPassword = true;
            return true;
        },
        // 手机号输入框失去焦点验证
        telBlur: function () {
            var telReg = /^1[35678][0-9]{9}$/;
            if(!telReg.test(this.tel)) {
                this.telErr = '请输入正确的手机号';
                this.isTel = false;
                return false;
            }
            this.isTel = true;
            return true;
        },
        // 用户点击注册按钮
        submit: function() {
            if(this.nicknameBlur() && this.passwordBlur() && this.confirmPasswordBlur() && this.telBlur()) {
                // console.log(this.nickname, this.password, this.tel);
                var that = this;
                // 发送ajax请求
                $.post('/ajax/register', {
                    nickname: this.nickname,
                    password: this.password,
                    telephone: this.tel
                }, function(data) {
                    if(data.state == 'no') {
                        // 手机号已存在
                        that.telErr = data.message;
                        that.isTel = false;
                    } else if(data.state == 'err') {
                        // 账号验证失败，将提示信息弹窗显示
                        alert(data.message);
                    }else if(data.state == 'ok') {
                        // 注册成功
                        // 将遮盖板显示
                        that.isSucceed = false;
                        that.username = data.message;
                    }
                })
            }
        }
    }
});