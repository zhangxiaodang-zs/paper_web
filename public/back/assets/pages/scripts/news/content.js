/**
 * Created by Administrator on 2019/2/21.
 */
/**
 * Created by Administrator on 2019/2/19.
 */
var newsContentList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //百度富文本编辑器初始化
        UE.getEditor("content", {
            /*toolbars: [[
                'fullscreen', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'link', 'unlink', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                'insertimage', 'emotion', 'insertvideo', 'music', 'map', 'template', 'background', '|',
                'horizontal', 'date', 'time', 'spechars', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                'searchreplace'
            ]],*/
            toolbars: [[
                'undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'superscript', 'subscript', '|', 'forecolor', 'backcolor', '|', 'removeformat', '|',
                'insertorderedlist', 'insertunorderedlist', '|', 'selectall', 'cleardoc', 'paragraph', '|', 'fontfamily', 'fontsize' ,
                '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', '|', 'insertimage', 'emotion', 'insertvideo',  '|', 'map',
                '|', 'horizontal', 'preview', 'drafts', 'formula'
            ]],
            autoHeightEnabled: false,
            initialFrameHeight: 200,
            serverUrl: webUrl + 'fileUpload',  //此处请求服务器的地址
            imageFieldName: "uploadFile",
            imageUrlPrefix: '',
            imageActionName: 'ajaxUpload',
            imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
            catcherUrlPrefix: '',
        });
        newsTypeDataGet(null, null);
        NewsContentTable.init();
        NewsContentEdit.init();
    });
}

var NewsContentTable = function () {
    var initTable = function () {
        var table = $('#news_table');
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
                    newstype: formData.newstype,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                newsContentDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "newsid", visible: false },
                { "data": "newstype" },
                { "data": "title" },
                { "data": "newsurl" },
                { "data": "summary" },
                { "data": "time" },
                { "data": "read" },
                { "data": "thumbs" },
                { "data": null }
            ],
            columnDefs: [
                {
                    "targets":[1],
                    "render":function(data, type, row, meta){
                        return '<input type="checkbox" class="checkboxes" value="1" />';
                    }
                },
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },
                {
                    "targets": [5],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return "<img src='" + data + "' style='width: 30px; height:20px'>";
                    }
                },
                {
                    "targets": [6],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return "<div class='toLong'>" + data + "</div>";
                    }
                },
                {
                    "targets": [7],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return dateTimeFormat(data, "/");
                    }
                },
                {
                    "targets": [10],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return '<a href="javascript:;" id="op_edit">编辑</a>'
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td:eq(1)', nRow).attr('style', 'text-align: center;');
            }
        });
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
        });

        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
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

var NewsContentEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                newstypeid: {
                    required: true
                },
                title: {
                    required: true
                },
                newsimage: {
                    required: true
                },
                summary: {
                    required: true
                }
            },
            messages: {
                newstypeid: {
                    required: "新闻类型必须输入"
                },
                title: {
                    required: "新闻标题必须输入"
                },
                newsimage: {
                    required: "缩略图必须上传"
                },
                summary: {
                    required: "新闻摘要必须输入"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });
        $('#register-btn').click(function() {
            btnDisable($('#register-btn'));
            if ($('.register-form').validate().form()) {
                var newsContent = $('.register-form').getFormData();
                newsContent.content = UE.getEditor('content').getContent();
                if(newsContent.content == ""){
                    alertDialog("新闻内容必须输入！");
                    return;
                }
                ////先上传LOGO
                //如果头像发生了变化，先上传头像
                //获取原来的头像
                var oldimage = $("input[name=oldimage]").val();
                if(newsContent.newsimage != oldimage) {
                    var formData = new FormData();
                    var fileInfo = $("#newsurl").get(0).files[0];
                    formData.append('image', fileInfo);
                    $.ajax({
                        type: 'POST',
                        url: webUrl + "new/news/upload/image",
                        data: formData,
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            if (result.code == SUCCESS) {
                                newsContent.newsurl = result.newsurl;
                                if($("input[name=edittype]").val() == NEWSADD){
                                    newsContentAdd(newsContent);
                                }else{
                                    newsContentEdit(newsContent);
                                }
                            } else {
                                alertDialog("上传新闻缩略图片失败！" + result.message);
                            }
                        },
                        error: function () {
                            alertDialog("上传新闻缩略图片失败！");
                        }
                    });
                }else {
                    if($("input[name=edittype]").val() == NEWSADD){
                        newsContentAdd(newsContent);
                    }else{
                        newsContentEdit(newsContent);
                    }
                }
            }
        });
        //新增新闻
        $('#op_add').click(function() {
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增新闻");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //清空图片
            $("#newsurl").siblings("img").attr("src", "/public/back/assets/pages/img/default.jpg");
            $("#newsurl").siblings("input[name=newsimage], input[name=oldimage]").val("");
            //清空文本框
            UE.getEditor('content').setContent("", false);

            $("input[name=edittype]").val(NEWSADD);
            $('#edit_news').modal('show');
        });
        //编辑新闻
        $("#news_table").on('click', '#op_edit', function (e) {
            e.preventDefault();
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑新闻");
            var exclude = [""];
            var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
            var newsid = $("#news_table").dataTable().fnGetData(row).newsid;
            var newsContent = new Object();
            for(var i=0; i < newsContentList.length; i++){
                if(newsid == newsContentList[i].newsid){
                    newsContent = newsContentList[i];
                }
            }
            var data = {newsid: newsid};
            getNewsContent(data, newsContent);
        });
    };

    return {
        init: function() {
            handleRegister();
        }
    };
}();

var NewsContentDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            var para = 1;
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", NewsContentDelete.deleteNewsContent, para)
        }
    });
    return{
        deleteNewsContent: function(){
            var newsContentList = {newsidlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var newsContentId = $("#news_table").dataTable().fnGetData(row).newsid;
                newsContentList.newsidlist.push(newsContentId);
            });
            newsContentDelete(newsContentList);
        }
    }
}();

function getNewsContentDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.code == SUCCESS) {
            var res = result;
            newsContentList = res.newslist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.newslist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog(result.message);
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("新闻信息获取失败！");
    }
}

function newsContentInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case NEWSADD:
            text = "新增";
            break;
        case NEWSEDIT:
            text = "编辑";
            break;
        case NEWSDELETE:
            text = "删除";
            break;
    }
    if(flg){
        if(result && result.code != SUCCESS){
            alert = result.message;
        }
        if (result && result.code == SUCCESS) {
            res = "成功";
            NewsContentTable.init();
            $('#edit_news_type').modal('hide');
        }
    }
    if(alert == "") alert = text + "新闻" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}

$("#op_inquiry").on("click", function(){
    //用户查询
    NewsContentTable.init();
});

$("#newsurl").change(function(){
    var file = $(this).get(0).files[0];
    var inputObj = $(this).siblings("input[name=newsimage]");
    var imgObj = $(this).siblings("img");
    inputObj.val(file);
    if(file == undefined){
        imgObj.attr("src", "/public/back/assets/pages/img/default.jpg");
        inputObj.val("");
        return;
    }
    var myimg = URL.createObjectURL(file);
    var img = new Image();
    img.src = myimg;
    img.onload = function(){
        if(img.width === 300 && img.height === 200){
            imgObj.attr("src", myimg);
        }else{
            imgObj.attr("src", "/public/back/assets/pages/img/default.jpg");
            inputObj.val("");
            $("#newsurl").val("");
            alertDialog("只能上传尺寸为300x200的图片！");
        }
    };
});

function getNewsContentEnd(flg, result, temp){
    if(flg){
        if (result && result.code == SUCCESS) {
            var newsContent = result;
            newsContent.newsid = temp.newsid;
            var exclude = ["content"];
            var options = { jsonValue: newsContent, exclude:exclude, isDebug: false};
            $(".register-form").initForm(options);
            //LOGO框赋值
            $("#newsurl").siblings("img").attr("src", temp.newsurl);
            $("#newsurl").siblings("input[name=newsimage], input[name=oldimage]").val(temp.newsurl);
            //文本框赋值
            UE.getEditor('content').setContent(newsContent.content, false);
            $("input[name=edittype]").val(NEWSEDIT);
            $('#edit_news').modal('show');
        }else{
            alertDialog("获取新闻内容失败！");
        }
    }else{
        alertDialog("获取新闻内容失败！");
    }
}

function getNewsTypeDataEnd(flg, result, callback) {
    App.unblockUI('#lay-out');
    /*flg = true;
    result = {code:200, message:"", newstypelist:[
        {newstypeid:"1", newstype:"查重经验",time:"20191220111111"},
        {newstypeid:"2", newstype:"论文修改",time:"20191220111111"},
        {newstypeid:"3", newstype:"论文协作",time:"20191220111111"},
    ]};*/
    if(flg){
        if (result && result.code == SUCCESS) {
            var newstypelist = result.newstypelist;
            newsTypeSelectBuild($("#newstype, #newstypeadd"), newstypelist);
        }
    }
}

function newsTypeSelectBuild(id, list){
    id.empty();
    for (var i = list.length - 1;  i >=0 ; i--) {
        id.prepend('<option value="' + list[i].newstypeid + '">' + list[i].newstype + '</option>');
    }
    id.prepend('<option value="" selected>请选择</option>');
}
