$(document).ready(function () {
    NewsList(); //新闻列表接口
});

function NewsList(){
    var data = {vip: vip, free: free, endtime: endtime};
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  webUrl +"newslist",    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {

        },
        error: function (errorMsg) {
        }
    });
}