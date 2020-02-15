/**
 * Created by Jianggy on 2019/12/04.
 */
var wxuserList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        WXUserTable.init();
    });
}

var WXUserTable = function () {
    var initTable = function () {
        var table = $('#wxuser_table');
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
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                wxuserDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": "nickname" },
                { "data": "headimgurl" },
                { "data": "free" },
                { "data": "vip" },
                { "data": "endtime" }
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
                    "targets":[2],
                    "render":function(data, type, row, meta){
                        return "<img src='" + data + "' style='width: 50px; height:50px'>";
                    }
                },{
                    "targets":[3],
                    "render": function(data, type, row, meta) {
                        var free = "未使用";
                        if(data == "true"){
                            free = "已使用";
                        }
                        return free;
                    }
                },{
                    "targets":[4],
                    "render": function(data, type, row, meta) {
                        var vip = "否";
                        if(data == "true"){
                            vip = "是";
                        }
                        return vip;
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td', nRow).attr('style', 'text-align: center; vertical-align: middle;');
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


function getWXUserDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.code == SUCCESS) {
            var res = result;
            wxuserList = res.wxuserlist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.wxuserlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog(result.message);
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("注册用户获取失败！");
    }
}

$("#wxuser_inquiry").on("click", function(){
    //用户查询
    WXUserTable.init();
});
