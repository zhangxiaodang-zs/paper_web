var totalcount;//总页数
var pagesize=5;//每页显示5条
var startindex=0;//当前页
var typeid;
var type_title;
$(document).ready(function () {
    typeid = localStorage.getItem('typeid');
    type_title = localStorage.getItem('type_title');
    NewsList(typeid,startindex,pagesize)//新闻列表接口
});

function NewsList(typeid,startindex,pagesize){
     $(".news_con ul").html();
     $(".news_con ul li").remove();
    var data = {
        "newstypeid": typeid,
        "currentpage": 0,
        "startindex": startindex,
        "pagesize":pagesize,
        "draw":0
    };
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: false,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:  'http://www.biye.com.cn:9900/java/paper/front/news/list',    //请求发送到TestServlet处
        data: sendMessageEdit(data),//将js对象转为字符串
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            for (var i = 0; i < result.newscontentlist.length; i++){
                $(".news_con ul").append(
                    '<li class="clearfix" data-url="news_info" id="'+result.newscontentlist[i].id+'">'+
                        '<img class="pull-left" src="'+result.newscontentlist[i].thumbs+'" alt="">'+
                        '<div class="pull-right" style="width: 74%;">'+
                            '<div class="title">'+result.newscontentlist[i].title+'</div>'+
                            '<div class="content text-clamp3">'+result.newscontentlist[i].summary+'</div>'+
                                '<div class="time">'+
                                    '<span style="margin-right: 30px">'+dateTimeFormat(result.newscontentlist[i].add_time)+'</span>'+
                    '<span>作者：'+result.newscontentlist[i].author+'</span>'+
                                '</div>'+
                        '</div>'+
                    '</li>'
                )
            }
            $(".news_con ul li").fadeIn(800);
            totalcount=result.totalcount;//总页数
            localStorage.setItem('totalcount', totalcount);

        },
        error: function (errorMsg) {
        }
    });
}


// 分页开始
layui.use(['laypage'], function(){
    totalcount = localStorage.getItem('totalcount');
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
        elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
        ,count:  totalcount //数据总数，从服务端得到
        ,limit:pagesize //每页显示的条数。laypage将会借助 count 和 limit 计算出分页数
        ,theme: '#a1cf40'
        ,prev: false
        ,next: '<em>→</em>'
        ,jump: function(obj){
            //console.log("当前页："+obj.curr)//得到当前页
            //console.log("每页显示："+obj.limit+" 条");//每页显示的条数
            var curr=obj.curr-1;
            NewsList(typeid,curr,pagesize)

        }

    });
});



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
        form.action = url+".html?id="+id;
        form.method = 'post';
        $(document.body).append(form);
        form.submit();
    })
});