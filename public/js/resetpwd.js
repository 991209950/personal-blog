$(function () {
    var regUname = /^[0-9]{6,11}$/,
        regAnswer = /^\S{1,20}$/,
        regPwd1 = /^[A-Za-z0-9_]{8,16}$/,
        regPwd2 = /[A-Za-z_][0-9]|[0-9][a-zA-Z_]/;
    // 测试JSON对象
    var jsonObj = {
        _id: 'a;lhdfsgkioehrgj',
        username: '123456',
        tel: '13283011765',
        verification: '我的注册日期？',
        answer: '2020.1.31'
    }
    // 自动跳转定时器
    var timer = null;
    // 为填写账号下面的确定按钮添加点击事件
    $('#btn-uname').click(function () {
        if (test('#username', '.errTel', '账号', regUname)) {
            // 此处应为ajax请求
            if ($('#username').val() == jsonObj.username) {
                $('.progress-bar').width('50%').text('验证问题');
                $('.problem').text(jsonObj.verification);
                $('.section-main_fillUname').addClass('hidden');
                $('.section-main_problem').removeClass('hidden');
            } else {
                $('.errTel').removeClass('hidden').text('请填写测试账号');
            }
        }
    });
    // 为填写密保问题下面的验证按钮添加点击事件
    $('#btn-ans').click(function () {
        if (test('#answer', '.errAnswer', '答案', regAnswer)) {
            // 此处应为ajax进行对比
            if ($('#answer').val() == jsonObj.answer) {
                $('.progress-bar').width('75%').text('填写新密码');
                $('.section-main_problem').addClass('hidden');
                $('.section-main_newPassword').removeClass('hidden');
            } else {
                $('.errAnswer').removeClass('hidden').text('答案不正确，请重新填写');
            }
        }
    });
    // 为新密码输入框添加失去焦点事件
    $('#newPassword').blur(function () {
        test('#newPassword', '.errNewPwd1', '新密码', regPwd1, regPwd2);
    });
    // 为确认密码输入框添加失去焦点事件
    $('#copyPassword').blur(function () {
        if ($(this).val().trim().length == 0) {
            $('.errNewPwd2').removeClass('hidden').text('确认密码不能为空');
            return;
        }
        if($(this).val() !== $('#newPassword').val()){
            $('.errNewPwd2').removeClass('hidden').text('两次密码不同，请重新输入');
            return;
        }
        $('.errNewPwd2').addClass('hidden');
    });
    // 为填写新密码下面的确认修改按钮添加点击事件
    $('#btn-newPwd').click(function(){
        $('#newPassword').blur();
        if($('.errNewPwd1.hidden').length == 0) {
            return;
        }
        $('#copyPassword').blur();
        if($('.errNewPwd2.hidden').length == 0) {
            return;
        }
        // 此处应为ajax修改密码
        jsonObj.password = $('#copyPassword').val();
        // 完成后...跳转页面
        $('.progress-bar').width('100%').text('完成');
        $('.section-main_newPassword').addClass('hidden');
        $('.section-main_complete').removeClass('hidden');
        // 自动跳转定时器
        var i = 5;
        timer = setInterval(function(){
            i --;
            $('.section-main_complete').children('h4').text(i + '秒后自动跳转到登录页面...');
            if(i == 0){
                clearInterval(timer);
                window.location.href = './login.html';
            }
        }, 1000);
    });
    function test(elem, errElem, str, reg1, reg2) {
        reg2 = reg2 ? reg2 : /\S/;
        if ($(elem).val().trim().length == 0) {
            $(errElem).removeClass('hidden').text(str + '不能为空');
            return false;
        }
        if (reg1.test($(elem).val()) && reg2.test($(elem).val())) {
            $(errElem).addClass('hidden')
            return true;
        }
        $(errElem).removeClass('hidden').text(str + '格式错误');
        return false;
    }
});