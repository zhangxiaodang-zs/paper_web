var id;
var s_title;
var title;
$(document).ready(function () {
     id = localStorage.getItem('id');//详情id
     s_title = localStorage.getItem('s_title');
     title = localStorage.getItem('title');
    $(".news_info_nav span").html(s_title+" > "+title);
    NewsInfo(id)//新闻列表接口
    NewsList_about();//获取相关文章
    NewsList_hot();//热点新闻
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
                $(".news_info .title").html(result.newscontent.title);//标题
                $(".news_info .info_author").html("作者："+result.newscontent.author);//作者
                $(".news_info .content p").html(result.newscontent.content);//内容
                $(".news_info .info_read").html("阅读 "+result.newscontent.read);//阅读
                $(".news_info .info_like").html("点赞 "+result.newscontent.like);//点赞
                $(".news_info .info_time").html(dateTimeFormat(result.newscontent.add_time));//时间
            }

        },
        error: function (errorMsg) {
        }
    });
}
//获取相关文章
function NewsList_about(){
    var data = {
        "newstype": 1 //1相关文章 2热点新闻
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/newshot',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            if (result.code == 200){
                if(result.questioncontentlist){
                    for (var i = 0; i < result.questioncontentlist.length; i++){
                        $(".news_list_hot_l ul").append(
                            '<li id="'+result.questioncontentlist[i].id+'" data-url="question_info">'+
                                '<div class="bt">'+result.questioncontentlist[i].title+'</div>'+
                                '<span style="margin-right: 20px">'+dateTimeFormat(result.questioncontentlist[i].add_time)+'</span>'+
                            ' <span>'+result.questioncontentlist[i].readtimes+'</span>'+
                            '</li>'
                        )
                    }

                }
            }

        },
        error: function (errorMsg) {
        }
    });
}

//获取热点新闻
function NewsList_hot(){
    var data = {
        "newstype": 2 //1相关文章 2热点新闻
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/newshot',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            if (result.code == 200){
                if(result.newscontentlist){
                    for (var i = 0; i < result.newscontentlist.length; i++){
                        $(".news_list_hot_r ul").append(
                            '<li id="'+result.newscontentlist[i].id+'" data-url="news_info">'+
                            '<div class="bt">'+result.newscontentlist[i].title+'</div>'+
                            '<span style="margin-right: 20px">'+dateTimeFormat(result.newscontentlist[i].add_time)+'</span>'+
                            ' <span>'+result.newscontentlist[i].readtimes+'</span>'+
                            '</li>'
                        )
                    }

                }
            }

        },
        error: function (errorMsg) {
        }
    });
}


//跳转详情
$(".news_list_hot_r ul,.news_list_hot_l ul").on('mouseenter', function () {
    $(".news_list_hot_r ul li,.news_list_hot_l ul li").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var url = $(this).data("url");
        var id=$(this).attr('id');
        var s_title=type_title;//二级标题
        var title=$(this).find(".bt").html();//列表标题
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

//点赞接口
$("#news_like").click(function () {
    var data = {
        "newsid": id
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/infolike',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            alert("点赞成功");
            // $("#news_like span").addClass("red");
            // $("#news_like img").attr('src', '/public/front/images/info_like_active.png');
        },
        error: function (errorMsg) {
        }
    });
})
