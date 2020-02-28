$(document).ready(function () {
    NewsList(); //新闻列表接口

});
var GetRequest=function(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
console.log( GetRequest().newstypeid)
var currentpage=0;
function NewsList(currentpage){
    var data = {
        "newstypeid": GetRequest().newstypeid,
        "currentpage": currentpage,
        "startindex": 0,
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
    NewsList(num);
})
$(".page_next").click(function () {
    $(".page_mess ul li").fadeIn()
})