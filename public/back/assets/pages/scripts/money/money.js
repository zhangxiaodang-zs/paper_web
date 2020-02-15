/**
 * Created by Jianggy on 2019/12/04.
 */
var moneyList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        MoneyTable.init();
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

var MoneyTable = function () {
    var initTable = function () {
        var table = $('#money_table');
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
                moneyDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": "nickname" },
                { "data": "checktime" },
                { "data": "amount" },
                { "data": "paytype" },
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },{
                    "targets":[3],
                    "render":function(data, type, row, meta){
                        return formatCurrency(data);
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


function getMoneyDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.code == SUCCESS) {
            var res = result;
            moneyList = res.paylist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.paylist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog(result.message);
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("资金信息获取失败！");
    }
}

$("#money_inquiry").on("click", function(){
    //用户查询
    MoneyTable.init();
});
