/**
 * Created by Administrator on 2019/2/28.
 */
var webUrl = regulateSucc.gramtuWebUrl;

//登录检查
function loginCheck(data){
    App.blockUI({target:'.login-container',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "manager/login",    //请求发送到TestServlet处
        data: sendMessageEdit(LOGIN, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("loginCheck:" + JSON.stringify(result));
            loginCheckEnd(true, result);

        },
        error: function (errorMsg) {
            console.info("loginCheck-error:" + JSON.stringify(errorMsg));
            loginCheckEnd(false, "");
        }
    });
}

//系统退出
function logoutCheck(data){
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "logout",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("logoutCheck:" + JSON.stringify(result));
            logOutEnd(true, result);

        },
        error: function (errorMsg) {
            console.info("logoutCheck-error:" + JSON.stringify(errorMsg));
            logOutEnd(false, "");
        }
    });
}

//获取微信注册用户信息
function wxuserDataGet(data,callback){
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:webUrl + "manager/wxuser/query",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("wxuserDataGet:"+JSON.stringify(result));
            getWXUserDataEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("wxuserDataGet-error:"+ JSON.stringify(errorMsg));
            getWXUserDataEnd(false,"",callback);
        }
    });
}

//获取订单信息
function orderDataGet(data,callback){
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:webUrl + "manager/order/query",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("orderDataGet:"+JSON.stringify(result));
            getOrderDataEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("orderDataGet-error:"+ JSON.stringify(errorMsg));
            getOrderDataEnd(false,"",callback);
        }
    });
}

//获取会员卡信息
function cardDataGet(data,callback){
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:webUrl + "manager/card/query",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("cardDataGet:"+JSON.stringify(result));
            getCardDataEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("cardDataGet-error:"+ JSON.stringify(errorMsg));
            getCardDataEnd(false,"",callback);
        }
    });
}

//发卡
function cardSend(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "manager/card/add",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("cardSend:" + JSON.stringify(result));
            cardInfoEditEnd(true, result, null);
        },
        error: function (errorMsg) {
            console.info("cardSend-error:" + JSON.stringify(errorMsg));
            cardInfoEditEnd(false, "", null);
        }
    });
}

//获取资金信息
function moneyDataGet(data,callback){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:webUrl + "manager/money/query",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("moneyDataGet:"+JSON.stringify(result));
            getMoneyDataEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("moneyDataGet-error:"+ JSON.stringify(errorMsg));
            getMoneyDataEnd(false,"",callback);
        }
    });
}

//下载未售出的卡号
function cardDownload(data,callback){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url:webUrl + "manager/card/export",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("cardDownload:"+JSON.stringify(result));
            cardDownloadEnd(true, result, null);
        },
        error:function(errorMsg){
            console.info("cardDownload-error:"+ JSON.stringify(errorMsg));
            cardDownloadEnd(false, "", null);
        }
    });
}

//新闻类型获取
function newsTypeDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {newstype: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/news/type/query",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsTypeDataGet:" + JSON.stringify(result));
            getNewsTypeDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("newsTypeDataGet-error:" + JSON.stringify(errorMsg));
            getNewsTypeDataEnd(false, "", callback);
        }
    });
}

//新闻类型增加
function newsTypeAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/news/type/add",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsTypeAdd:" + JSON.stringify(result));
            newsTypeInfoEditEnd(true, result, NEWSTYPEADD);
        },
        error: function (errorMsg) {
            console.info("newsTypeAdd-error:" + JSON.stringify(errorMsg));
            newsTypeInfoEditEnd(false, "", NEWSTYPEADD);
        }
    });
}

//新闻类型编辑
function newsTypeEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/news/type/edit",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsTypeEdit:" + JSON.stringify(result));
            newsTypeInfoEditEnd(true, result, NEWSTYPEEDIT);
        },
        error: function (errorMsg) {
            console.info("newsTypeEdit-error:" + JSON.stringify(errorMsg));
            newsTypeInfoEditEnd(false, "", NEWSTYPEEDIT);
        }
    });
}

//新闻类型删除
function newsTypeDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/news/type/delete",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsTypeDelete:" + JSON.stringify(result));
            newsTypeInfoEditEnd(true, result, NEWSTYPEDELETE);
        },
        error: function (errorMsg) {
            console.info("newsTypeDelete-error:" + JSON.stringify(errorMsg));
            newsTypeInfoEditEnd(false, "", NEWSTYPEDELETE);
        }
    });
}

//新闻内容获取
function newsContentDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {newstype: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/newscontent/content/query",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsContentDataGet:" + JSON.stringify(result));
            getNewsContentDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("newsContentDataGet-error:" + JSON.stringify(errorMsg));
            getNewsContentDataEnd(false, "", callback);
        }
    });
}

//新闻增加
function newsContentAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/newscontent/content/add",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsContentAdd:" + JSON.stringify(result));
            newsContentInfoEditEnd(true, result, NEWSADD);
        },
        error: function (errorMsg) {
            console.info("newsContentAdd-error:" + JSON.stringify(errorMsg));
            newsContentInfoEditEnd(false, "", NEWSADD);
        }
    });
}

//新闻编辑
function newsContentEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/newscontent/content/edit",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsContentEdit:" + JSON.stringify(result));
            newsContentInfoEditEnd(true, result, NEWSEDIT);
        },
        error: function (errorMsg) {
            console.info("newsContentEdit-error:" + JSON.stringify(errorMsg));
            newsContentInfoEditEnd(false, "", NEWSEDIT);
        }
    });
}

//新闻删除
function newsContentDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/newscontent/content/delete",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("newsContentDelete:" + JSON.stringify(result));
            newsContentInfoEditEnd(true, result, NEWSDELETE);
        },
        error: function (errorMsg) {
            console.info("newsContentDelete-error:" + JSON.stringify(errorMsg));
            newsContentInfoEditEnd(false, "", NEWSDELETE);
        }
    });
}

//获取新闻信息
function getNewsContent(data,callback){
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/newscontent/content/detail",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("getNewsContent:"+JSON.stringify(result));
            getNewsContentEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("getNewsContent-error:"+ JSON.stringify(errorMsg));
            getNewsContentEnd(false,"",callback);
        }
    });
}

//问题类型获取
function questionTypeDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {questiontype: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/question/type/query",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionTypeDataGet:" + JSON.stringify(result));
            getQuestionTypeDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("questionTypeDataGet-error:" + JSON.stringify(errorMsg));
            getQuestionTypeDataEnd(false, "", callback);
        }
    });
}

//问题类型增加
function questionTypeAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/question/type/add",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionTypeAdd:" + JSON.stringify(result));
            questionTypeInfoEditEnd(true, result, QUESTIONTYPEADD);
        },
        error: function (errorMsg) {
            console.info("questionTypeAdd-error:" + JSON.stringify(errorMsg));
            questionTypeInfoEditEnd(false, "", QUESTIONTYPEADD);
        }
    });
}

//问题类型编辑
function questionTypeEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/question/type/edit",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionTypeEdit:" + JSON.stringify(result));
            questionTypeInfoEditEnd(true, result, QUESTIONTYPEEDIT);
        },
        error: function (errorMsg) {
            console.info("questionTypeEdit-error:" + JSON.stringify(errorMsg));
            questionTypeInfoEditEnd(false, "", QUESTIONTYPEEDIT);
        }
    });
}

//问题类型删除
function questionTypeDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/question/type/delete",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionTypeDelete:" + JSON.stringify(result));
            questionTypeInfoEditEnd(true, result, QUESTIONTYPEDELETE);
        },
        error: function (errorMsg) {
            console.info("questionTypeDelete-error:" + JSON.stringify(errorMsg));
            questionTypeInfoEditEnd(false, "", QUESTIONTYPEDELETE);
        }
    });
}

// 问题内容获取
function questionContentDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {questiontype: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/questioncontent/content/query",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionContentDataGet:" + JSON.stringify(result));
            getQuestionContentDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("questionContentDataGet-error:" + JSON.stringify(errorMsg));
            getQuestionContentDataEnd(false, "", callback);
        }
    });
}

//问题增加
function questionContentAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/questioncontent/content/add",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionContentAdd:" + JSON.stringify(result));
            questionContentInfoEditEnd(true, result, QUESTIONADD);
        },
        error: function (errorMsg) {
            console.info("questionContentAdd-error:" + JSON.stringify(errorMsg));
            questionContentInfoEditEnd(false, "", QUESTIONADD);
        }
    });
}

//问题编辑
function questionContentEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/questioncontent/content/edit",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionContentEdit:" + JSON.stringify(result));
            questionContentInfoEditEnd(true, result, QUESTIONEDIT);
        },
        error: function (errorMsg) {
            console.info("questionContentEdit-error:" + JSON.stringify(errorMsg));
            questionContentInfoEditEnd(false, "", QUESTIONEDIT);
        }
    });
}

//问题删除
function questionContentDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/questioncontent/content/delete",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("questionContentDelete:" + JSON.stringify(result));
            questionContentInfoEditEnd(true, result, NEWSTYPEDELETE);
        },
        error: function (errorMsg) {
            console.info("questionContentDelete-error:" + JSON.stringify(errorMsg));
            questionContentInfoEditEnd(false, "", QUESTIONDELETE);
        }
    });
}

// 获取问题详情
function getQuestionContent(data,callback){
    $.ajax({
        type:"post",
        contentType:"application/json",
        async:true,        //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "http://www.biye.com.cn:9900/java/paper/back/questioncontent/content/detail",  //请求发送到TestServlet处
        data:sendMessageEdit(DEFAULT, data),
        dataType:"json",      //返回数据形式为json
        success:function(result){
            console.info("getQuestionContent:"+JSON.stringify(result));
            getQuestionContentEnd(true,result,callback);
        },
        error:function(errorMsg){
            console.info("getQuestionContent-error:"+ JSON.stringify(errorMsg));
            getQuestionContentEnd(false,"",callback);
        }
    });
}