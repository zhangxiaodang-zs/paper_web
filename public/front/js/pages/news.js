var currentpage=0;//当前页
var startindex=0;//开始页
var typeid
var type_title;
$(document).ready(function () {
    typeid = localStorage.getItem('typeid');
    type_title = localStorage.getItem('type_title');
    NewsList(startindex,typeid)//新闻列表接口
});

function NewsList(startindex,typeid){
    $(".news_con ul").html();
    $(".news_con ul li").remove();
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
                $(".news_con ul").append(
                    '<li class="clearfix" data-url="news_info" id="'+result.newscontentlist[i].id+'">'+
                        '<img class="pull-left" src="'+result.newscontentlist[i].thumbs+'" alt="">'+
                        '<div class="pull-right" style="width: 74%;">'+
                            '<div class="title">'+result.newscontentlist[i].title+'</div>'+
                            '<div class="content">'+result.newscontentlist[i].summary+'</div>'+
                                '<div class="time">'+
                                    '<span style="margin-right: 30px">'+dateTimeFormat(result.newscontentlist[i].add_time)+'</span>'+
                    '<span>作者：'+result.newscontentlist[i].author+'</span>'+
                                '</div>'+
                        '</div>'+
                    '</li>'
                )
            }
            $(".news_con ul li").fadeIn(800);
            // $(".news_con").append(
            //     55
            // )
        },
        error: function (errorMsg) {
        }
    });
}
//分页js
$(".page_mess ul li").click(function () {
    $(this).addClass("page_active").siblings().removeClass("page_active");
    var num=$(this).attr("num");
    startindex=num;
    NewsList(startindex,typeid);
})
$(".page_next").click(function () {
    $(".page_mess ul li").fadeIn()
})

//跳转详情
$(".news_con ul").on('mouseenter', function () {
    $(".news_con ul li").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).data("url");
        var id=$(this).attr('id');
        var s_title=type_title;//二级标题
        var title=$(this).find(".title").html();//列表标题
        localStorage.setItem('id', id);
        localStorage.setItem('s_title', s_title);
        localStorage.setItem('title', title);
        var form = document.createElement('form');
        form.action = url;
        form.method = 'post';
        $(document.body).append(form);
        form.submit();
    })
});