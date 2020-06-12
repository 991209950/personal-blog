$(function() {
    changeSize();
    window.onresize = changeSize;

    function changeSize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        // 背景根据可视区窗口大小自适应
        if (w / h > 4256 / 2832) {
            $('.lay_wrap').css('backgroundSize', w + 'px auto');
        } else {
            $('.lay_wrap').css('backgroundSize', 'auto ' + h + 'px');
        }
        if (w < 800) {
            $('.login').css('left', '320px');
        } else {
            $('.login').css('left', '40%');
        }
        if (h < 600) {
            $('.login').css('top', '120px');
        } else {
            $('.login').css('top', '20%');
        }
    }
    // 账号输入框失去焦点事件
    $('input:eq(0)').blur(function() {
        var regUname = /^[0-9]{6,11}$/;
        inpBlur(this, '账号', regUname);
    });
    // 密码输入框失去焦点事件
    $('input:eq(1)').blur(function() {
        var regPwd1 = /^[A-Za-z0-9_]{8,16}$/;
        var regPwd2 = /[A-Za-z_][0-9]|[0-9][a-zA-Z_]/;
        inpBlur(this, '密码', regPwd1, regPwd2);
    });
    // 登录点击事件
    var form = document.getElementById('form');
    $('button').click(function() {
        $('input:eq(0)').blur();
        if ($('.hidden').length == 0) {
            return false;
        }
        $('input:eq(1)').blur();
        if ($('.hidden').length == 0) {
            return false;
        }
        // 将普通的html表单转换为表单对象
        var formData = new FormData(form);
        // 创建ajax对象
        var xhr = new XMLHttpRequest();
        // 对ajax对象进行配置
        xhr.open('post', '/ajax/login');
        // 发送ajax请求
        xhr.send(formData);
        // 监听xhr对象下面的onload事件
        xhr.onload = function () {
            if(xhr.status == 200) {
                // console.log(xhr.responseText);
                window.location.href='/index.html';
            }else {
                $('.err').removeClass('hidden').children('.message').text(xhr.responseText);
            }
        }

    });

    function inpBlur(elem, str, reg1, reg2) {
        if ($(elem).val().trim().length == 0) {
            $('.err').removeClass('hidden').children('.message').text(str + '不能为空');
        } else {
            reg2 = reg2 ? reg2 : /\w/;
            if (reg1.test($(elem).val()) && reg2.test($(elem).val())) {
                $('.err').addClass('hidden');
            } else {
                $('.err').removeClass('hidden').children('.message').text(str + '格式不正确');
            }
        }
    }
})