/**
 * Created by Administrator on 2019/2/19.
 */
function sendMessageEdit(oJson){
   // console.info(oJson);
    return JSON.stringify(oJson);
}

function msgHeadMake(type){
    return {
        "timestamp": getTimeStamp(),
        "token": loginSucc.token || '',
        "userid": loginSucc.userid || '',
        "termid": ""
    };
}

function getTimeStamp(){
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y.toString() + (m < 10 ? "0" + m : m) + (d < 10 ? "0" + d : d) + now.toTimeString().substr(0, 8).replace(/:/g, "");
}

function confirmDialog(tips, func, para){
    bootbox.dialog({
        message: tips,
        title: "提示",
        buttons: {
            success: {
                label: "确定",
                className: "blue",
                callback: function(){
                    func(para)
                }
            },
            danger: {
                label: "取消",
                className: "red"
            }
        }
    });
}

function alertDialog(tips){
    bootbox.dialog({
        message: tips,
        title: "提示",
        buttons: {
            success: {
                label: "确定",
                className: "blue"
            }
        }
    });
}

function sexFormat(sexcode){
    var sex = "女";
    switch (sexcode){
        case "0":
            sex = "男";
            break;
    }
    return sex;
}

function dateTimeFormat(datetime){
    if(datetime.length < 14) return datetime;
    return datetime.substr(0, 4) + "/" + datetime.substr(4, 2) + "/" +
        datetime.substr(6, 2) + " " + datetime.substr(8, 2) + ":" +
        datetime.substr(10, 2) + ":" + datetime.substr(12, 2);
}


function conferenceDateFormat(dateRange){
    if(dateRange.length < 8) return dateRange;
    return dateRange.substr(0, 4) + "/" + dateRange.substr(4, 2) + "/" +
        dateRange.substr(6, 2);
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getNowFormatTime() {
    var date = new Date();
    var seperator1 = ":";
    var hours= date.getHours();
    var minutes = date.getMinutes();
    if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    var currentTime = hours + seperator1 + minutes;
    return currentTime;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";

    var uuid = s.join("-");
    return uuid.replace(/-/g, "");
}

function makeQRCode(){
    var state = uuid();
    var url = "https://open.weixin.qq.com/connect/qrconnect?appid=wxa8dbebc53ea8b98d&" +
        "redirect_uri=http%3A%2F%2Fwww.biye.com.cn/paper/login&response_type=code&" +
        "scope=snsapi_login&state=" + state + "#wechat_redirect";
    $("#qrcode").empty();
    $("#qrcode").attr("src", url)
}

function btnDisable(id){
    id.attr("disabled","disabled");
    setTimeout(btnEnable, 3000, id);
}


function btnEnable(id){
    id.removeAttr("disabled");
}




$(".el-menu-item").on("click", function(e){
    var url = $(this).data("url");
    if(url=='news'){
        $(".item-check").fadeIn();
        $(".el-menu-item").eq(2).addClass("is-active").siblings().removeClass('is-active');
       return false;
    }
    if(url=='question'){
        $(".item-search").fadeIn();
        $(".el-menu-item").eq(3).addClass("is-active").siblings().removeClass('is-active');
        return false;
    }
    if(url=='contact'){
        $(".item_contact").fadeIn();
        $(".el-menu-item").eq(4).addClass("is-active").siblings().removeClass('is-active');
        return false;
    }
    var form = document.createElement('form');
    form.action = url;
    form.method = 'post';
    $(document.body).append(form);
    form.submit();
});

//二级菜单 事假委托给直接父元素
//行业新闻
$(".hy_news").on('click', '.el-divider', function (e) {
    var url = $(this).data("url");
    var typeid=$(this).attr('id');
    var type_title=$(this).html();
    //储存值
    localStorage.setItem('typeid', typeid);
    localStorage.setItem('type_title', type_title);
    var form = document.createElement('form');
    form.action = url;
    form.method = 'post';
    $(document.body).append(form);
    form.submit();
});
//常见问题
$(".question_news").on('click', '.el-divider', function (e) {
    var url = $(this).data("url");
    var typeid=$(this).attr('id');
    var type_title=$(this).html();
    //储存值
    localStorage.setItem('typeid', typeid);
    localStorage.setItem('type_title', type_title);
    var form = document.createElement('form');
    form.action = url;
    form.method = 'post';
    $(document.body).append(form);
    form.submit();
});
//联系我们
$(".el-divider").on('click',function (e) {
    var url = $(this).data("url");
    var form = document.createElement('form');
    form.action = url;
    form.method = 'post';
    $(document.body).append(form);
    form.submit();
});


$("#login-btn").on("click", function(){
    if(login != 1){
        makeQRCode();
        $("#login-modal").modal('show');
    }
});

function niceIn(prop){
    prop.find('i').addClass('niceIn');
    setTimeout(function(){
        prop.find('i').removeClass('niceIn');
    },1000);
}
$("#zan").click(function () {
    if(login != 1) {
        makeQRCode();
        $("#login-modal").modal('show');
        return;
    }
    if(thumbup == 'true'){
        return;
    }
    var that = this;
    //点赞处理
    App.blockUI({target:'.paper-container',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "paper/login/updthumbup",    //请求发送到TestServlet处
        data: sendMessageEdit({openid: openid}),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            App.unblockUI('.paper-container');
            //console.info("zan:" + JSON.stringify(result));
            $("#zan-number").attr("data-value", result.thumbupnum);
            $("#zan-number").text(result.thumbupnum);
            thumbup = 'true';
            $("#zan > img").attr("src", "/public/front/images/zan-b.png")
            userInfoSave();
            $.tipsBox({
                obj: $(that),
                str: "+1",
                callback: function () {
                }
            });
            niceIn($(this));
        },
        error: function (errorMsg) {
           // console.info("zan-error:" + JSON.stringify(errorMsg));
            App.unblockUI('.paper-container');
        }
    });
});

function userInfoSave(){
    var data = {vip: vip, free: free, endtime: endtime, thumbup: thumbup};
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "/user/save",    //请求发送到TestServlet处
        data: sendMessageEdit(data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {

        },
        error: function (errorMsg) {
        }
    });
}

function vipTimeDisplay(){
    if(vip == "true"){
        $("#endtime").show();
        $("#novip").hide();
        $("#time").html(endtime);
    }else{
        $("#endtime").hide();
        $("#novip").show();
    }
}



/**————————————————————————————————适配——————————————————————————————————————**/
(function (doc, win) {
    var docEl = doc.documentElement,
        // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100*(clientWidth / 1920) + 'px';
        };

    recalc();
    //判断是否支持监听事件 ，不支持则停止
    if (!doc.addEventListener) return;
    //注册翻转事件
    win.addEventListener(resizeEvt, recalc, false);

})(document, window);

//清除null字眼
function clearNull(field,content){
    if(field&&field!='null'){
        return field;
    }else{
        return content;
    }
}
//标题或者内容截取
function InterceptField(field,contnet,num){
    if(field&&field!='null'){
        if(field.length>num){
            field = field.substring(0,(num-1))+'...';
            return field
        }else{
            return field
        }
    }else{
        return contnet
    }
}