$(document).ready(function () {
    PaperTable.init();
});

var PaperTable = function () {
    var initTable = function () {
        var table = $('#paper_table');
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false,
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "pageLength": PageLength,
            //"pagingType": "numbers",
            "serverSide": true,
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "serverSide": false,
            "bLengthChange": false,
            //"order": [[ 1, "desc"]],
            "ajax":function (data, callback, settings) {
                var data = {openid: openid}
                paperDownloadGet(data, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": "code"},
                { "data": "message"},
                { "data": "check_time" },
                { "data": "author" },
                { "data": "title" },
                { "data": "total_similar" },
                { "data": "downurl" },
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "render": function (data, type, row, meta) {
                        var status = "";
                        switch (data) {
                            case "00":
                            case "01":
                            case "99":
                                status = "检测中";
                                break;
                            case "02":
                                status = "检测成功";
                                break;
                            case "03":
                                status = "检测失败";
                                break;
                        }
                        return status
                    }
                },
                {
                    "targets": [6],
                    "render": function (data, type, row, meta) {
                        var edit;
                        if(row.code == "02"){
                            edit = '<a href="' + data +'" id="op_edit">下载报告</a>';
                        }else{
                            edit = '<a href="javascript:;" id="op_submit">再次提交</a> ';
                            //预计时间
                            if(timeLeft(row.check_time)){
                                var differ = timeDiffer(row.check_time);
                                edit += '<br>预计等待时间' + differ;
                            }else{
                                edit += '<br>已超过40分钟，建议重新提交';
                            }
                        }
                        return edit;
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td', nRow).attr('style', 'text-align: center;');
            }
        });
    };
    return {
        init: function (data) {
            if (!jQuery().dataTable) {
                return;
            }
            initTable(data);
        }
    };

}();

function tableDataSet(draw, recordsTotal, filter, data, callback){
    var returnData = {};
    returnData.draw = draw;
    returnData.recordsTotal = recordsTotal;
    returnData.recordsFiltered = filter;
    returnData.data = data;
    callback(returnData);
}

function paperDownloadGet(data, callback){
    App.blockUI({target:'.paper-container',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "paper/content/download",    //请求发送到TestServlet处
        data: sendMessageEdit(data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("paperDownloadGet:" + JSON.stringify(result));
            App.unblockUI('.paper-container');
            if(result.length == 0){
                tableDataSet(0, 0, 0, [], callback);
            }else{
                tableDataSet(0, result.length,  result.length, result, callback);
            }
        },
        error: function (errorMsg) {
            console.info("paperDownloadGet-error:" + JSON.stringify(errorMsg));
            App.unblockUI('.paper-container');
            alertDialog("获取下载列表失败！");
            tableDataSet(0, 0, 0, [], callback);
        }
    });
}

$('#paper_table').on('click', '#op_submit', function (e) {
    var that = this;
    $('#mpanel1').empty();
    jigsaw.init({
        el: document.getElementById('mpanel1'),
        onSuccess: function() {
            $("#verify-modal").modal("hide");
            var row = $(that).parents('tr')[0];
            var orderno = $("#paper_table").dataTable().fnGetData(row).orderno;
            paperResubmit({orderno: orderno});
        },
        onFail: null,
        onRefresh: null
    });
    $("#verify-modal").modal("show");
})

$('#op_refresh').on('click', function (e) {
    PaperTable.init();
})

function paperResubmit(data,){
    App.blockUI({target:'.paper-container',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: webUrl + "paper/content/resubmit",    //请求发送到TestServlet处
        data: sendMessageEdit(data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("paperResubmit:" + JSON.stringify(result));
            App.unblockUI('.paper-container');
            if(result.code == 200){
                alertDialog("重新提交成功！");
            }else{
                alertDialog("重新提交失败！");
            }
            PaperTable.init();
        },
        error: function (errorMsg) {
            console.info("paperResubmit-error:" + JSON.stringify(errorMsg));
            App.unblockUI('.paper-container');
            alertDialog("重新提交失败！");
        }
    });
}

function timeLeft(subtime){
    var leftTime =  (new Date()) - (new Date(subtime.replace(/-/g,  "/")));
    if(leftTime > 40 * 60 * 1000){
        return false;
    }else{
        return true;
    }
}
function timeDiffer(subtime) {
    var left =  (new Date()) - (new Date(subtime.replace(/-/g,  "/")));
    var leftTime = 40 * 60 * 1000 - left;
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    var timehtml= minutes + "分" + seconds + "秒";
    return timehtml;
}