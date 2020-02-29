var currentpage=0;//当前页
var startindex=0;//开始页
$(document).ready(function () {
    var typeid = localStorage.getItem('typeid');
    console.log(typeid)
    NewsList(startindex,typeid)//列表接口
});


function NewsList(currentpage,typeid){
    var data = {
        "newstypeid": typeid,
        "currentpage": 0,
        "startindex": startindex,
        "pagesize":20,
        "draw":0
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/list',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            // console.log(JSON.stringify(result))
            for (var i = 0; i < result.newscontentlist.length; i++){
                $(".question_con ul").append(
                    '<li class="clearfix" data-url="news_info">'+
                    '<div class="title">'+result.newscontentlist[i].title+'</div>'+
                    '<div class="content">'+result.newscontentlist[i].summary+'</div>'+
                    '<div class="time">'+
                    '<span style="margin-right: 30px">'+result.newscontentlist[i].add_time+'</span>'+
                    '<span>作者：'+result.newscontentlist[i].author+'</span>'+
                    '</div>'+
                    '</li>'
                )
            }
        },
        error: function (errorMsg) {
        }
    });
}

//分页js
$(".page_mess ul li").click(function () {
    $(".news_con ul li").remove();
    $(this).addClass("page_active").siblings().removeClass("page_active");
    var num=$(this).attr("num");
    startindex=num;
    console.log(startindex)
    NewsList(startindex);
})
$(".page_next").click(function () {
    $(".page_mess ul li").fadeIn()
})