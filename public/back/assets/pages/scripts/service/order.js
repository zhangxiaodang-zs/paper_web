/**
 * Created by Jianggy on 2019/12/04.
 */
var orderList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        OrderTable.init();
    });
}
//时间选择控件初始化
const dateOptions = {
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii:ss',
    minuteStep: 10,
    autoclose: true,
    todayBtn: true
};

$('#starttime').datetimepicker(dateOptions).on('show', function () {
    const endTime = $('#endtime').val();
    if (endTime !== '') {
        $(this).datetimepicker('setEndDate', endTime);
    } else {
        $(this).datetimepicker('setEndDate', null);
    }
});

$('#endtime').datetimepicker(dateOptions).on('show', function () {
    const startTime = $('#starttime').val();
    if (startTime !== '') {
        $(this).datetimepicker('setStartDate', startTime);
    } else {
        $(this).datetimepicker('setStartDate', null);
    }
});

var OrderTable = function () {
    var initTable = function () {
        var table = $('#order_table');
        pageLengthInit(table);
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false, // save datatable state(pagination, sort, etc) in cookie.
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "pageLength": PageLength,
            "serverSide": true,
            "pagingType": "bootstrap_extended",
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "ajax":function (data, callback, settings) {
                var formData = $(".inquiry-form").getFormData();
                var da = {
                    nickname: formData.nickname,
                    starttime: formData.starttime,
                    endtime: formData.endtime,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                orderDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": "orderno" },
                { "data": "nickname" },
                { "data": "check_time" },
                { "data": "title" },
                { "data": "author" },
                { "data": "code" },
                { "data": "message" },
                { "data": "total_similar" },
                { "data": "downurl" }
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },
                {
                    "targets":[6],
                    "render":function(data, type, row, meta){
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
                },{
                    "targets":[9],
                    "render": function(data, type, row, meta) {
                        var edit;
                        if(row.code == "02"){
                            edit = '<a href="' + data +'" id="op_edit">下载报告</a>';
                        }else{
                            edit = '- ';
                        }
                        return edit;
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td', nRow).attr('style', 'text-align: center; vertical-align: middle;');
                $('td:eq(7)', nRow).attr('style', 'text-align: left;');
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


function getOrderDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.code == SUCCESS) {
            var res = result;
            orderList = res.orderlist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.orderlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog(result.message);
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("订单信息获取失败！");
    }
}

$("#order_inquiry").on("click", function(){
    //用户查询
    OrderTable.init();
});
