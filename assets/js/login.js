$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-reg').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-reg').show()
        $('.reg-box').hide()
    })
    //从layui中获取 form对象
    let form = layui.form;
    let layer = layui.layer;
    //通过form.verify() 函数自定义校验规则
    form.verify({
        //自定义了一个叫做 pwd校验规则
        pwd: [/^\S{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            if ($('.reg-box input[name=repassword]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault();
        console.log(1);
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val()
            },
            success: function (res) {
                console.log(res);
                //注册失败校验
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //注册成功提示
                layer.msg(res.message);
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }

        })
    })
})