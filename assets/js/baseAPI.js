let baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        let data = res.responseJSON;
        if (data.status == 1 && data.message == '身份认证失败！') {
            location.href = '/login.html';
            localStorage.removeItem('token');
        }
    }
})