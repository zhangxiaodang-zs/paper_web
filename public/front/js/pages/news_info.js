var id;
var s_title;
var title;
$(document).ready(function () {
     id = localStorage.getItem('id');
     s_title = localStorage.getItem('s_title');
     title = localStorage.getItem('title');
    console.log(id)
    console.log(s_title)
    console.log(title)
    $(".news_info_nav span").html(s_title+" > "+title);
    NewsInfo(id)//新闻列表接口
});

function NewsInfo(id){
    var data = {
        "newsid": id,
        "currentpage": 0,
        "startindex": 0,
        "pagesize":20,
        "draw":0
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/content',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            if (result.code == 200){
                console.log("成功")
                console.log(result.newscontent.title)
                $(".news_info .title").html(result.newscontent.title);//标题
                $(".news_info .info_time").html(dateTimeFormat(result.newscontent.updtime));//时间
                $(".news_info .info_author").html("作者："+result.newscontent.author);//作者
                $(".news_info .content p").html(result.newscontent.content);//内容
            }

        },
        error: function (errorMsg) {
        }
    });
}