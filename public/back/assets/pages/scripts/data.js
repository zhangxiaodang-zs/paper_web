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