$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: 'post', //get或post
            url: '/logout', //请求的地址
            success: function() { //成功的回调函数
                location.href = 'login.html';
            },
        });
    } else {
        alert('退出登录失败');
    };
});