$('#userForm').on('submit', function() {
    var formDate = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/users', //请求的地址
        data: formDate, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function() { //成功的回调函数
            location.reload();
        },
        error: function() {
            alert('添加用户失败');
        }
    });
    return false;
});
$('#avatar').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        processData: false,
        contentType: false,
        success: function(response) { //成功的回调函数
            // console.log(response)
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
});
$.ajax({
    type: 'get', //get或post
    url: '/users', //请求的地址
    success: function(response) { //成功的回调函数
        // console.log(response)
        var html = template('userTpl', {
            data: response
        });
        $('#userBox').html(html)

    }
});
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get', //get或post
        url: '/users/' + id, //请求的地址
        success: function(response) { //成功的回调函数
            // console.log(result)
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});