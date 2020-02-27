/**
 * Created by Administrator on 2019/2/21.
 */
/**
 * Created by Administrator on 2019/2/19.
 */
var questionContentList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //百度富文本编辑器初始化
        UE.getEditor("content", {
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
        questionTypeDataGet(null, null);
        QuestionContentTable.init();
        QuestionContentEdit.init();
    });
}

var QuestionContentTable = function () {
    var initTable = function () {
        var table = $('#question_table');
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
                    questiontype: formData.questiontype,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                questionContentDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "questionid", visible: false },
                { "data": "questiontype" },
                { "data": "title" },
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
                        return "<div class='toLong'>" + data + "</div>";
                    }
                },
                {
                    "targets": [6],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return dateTimeFormat(data, "/");
                    }
                },
                {
                    "targets": [9],
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

var QuestionContentEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                questiontypeid: {
                    required: true
                },
                title: {
                    required: true
                },
                summary: {
                    required: true
                }
            },
            messages: {
                questiontypeid: {
                    required: "问题类型必须输入"
                },
                title: {
                    required: "问题标题必须输入"
                },
                summary: {
                    required: "回答摘要必须输入"
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
                var questionContent = $('.register-form').getFormData();
                questionContent.content = UE.getEditor('content').getContent();
                if(questionContent.content == ""){
                    alertDialog("回答内容必须输入！");
                    return;
                }
                if($("input[name=edittype]").val() == QUESTIONADD){
                    questionContentAdd(questionContent);
                }else{
                    questionContentEdit(questionContent);
                }
            }
        });
        //新增问题
        $('#op_add').click(function() {
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增问题");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //清空文本框
            UE.getEditor('content').setContent("", false);

            $("input[name=edittype]").val(QUESTIONADD);
            $('#edit_question').modal('show');
        });
        //编辑问题
        $("#question_table").on('click', '#op_edit', function (e) {
            e.preventDefault();
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑问题");
            var exclude = [""];
            var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
            var questionid = $("#question_table").dataTable().fnGetData(row).questionid;
            var questionContent = new Object();
            for(var i=0; i < questionContentList.length; i++){
                if(questionid == questionContentList[i].questionid){
                    questionContent = questionContentList[i];
                }
            }
            var data = {questionid: questionid};
            getQuestionContent(data, questionContent);
        });
    };

    return {
        init: function() {
            handleRegister();
        }
    };
}();

var QuestionContentDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            var para = 1;
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", QuestionContentDelete.deleteQuestionContent, para)
        }
    });
    return{
        deleteQuestionContent: function(){
            var questionContentList = {questionidlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var questionContentId = $("#question_table").dataTable().fnGetData(row).questionid;
                questionContentList.questionidlist.push(questionContentId);
            });
            questionContentDelete(questionContentList);
        }
    }
}();

function getQuestionContentDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.code == SUCCESS) {
            var res = result;
            questionContentList = res.questionlist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.questionlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog(result.message);
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("问题信息获取失败！");
    }
}

function questionContentInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case QUESTIONADD:
            text = "新增";
            break;
        case QUESTIONEDIT:
            text = "编辑";
            break;
        case QUESTIONDELETE:
            text = "删除";
            break;
    }
    if(flg){
        if(result && result.code != SUCCESS){
            alert = result.message;
        }
        if (result && result.code == SUCCESS) {
            res = "成功";
            QuestionContentTable.init();
            $('#edit_question_type').modal('hide');
        }
    }
    if(alert == "") alert = text + "问题" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}

$("#op_inquiry").on("click", function(){
    //用户查询
    QuestionContentTable.init();
});

function getQuestionContentEnd(flg, result, temp){
    if(flg){
        if (result && result.code == SUCCESS) {
            var questionContent = result;
            questionContent.questionid = temp.questionid;
            var exclude = ["content"];
            var options = { jsonValue: questionContent, exclude:exclude, isDebug: false};
            $(".register-form").initForm(options);
            //文本框赋值
            UE.getEditor('content').setContent(questionContent.content, false);
            $("input[name=edittype]").val(QUESTIONEDIT);
            $('#edit_question').modal('show');
        }else{
            alertDialog("获取问题内容失败！");
        }
    }else{
        alertDialog("获取问题内容失败！");
    }
}

function getQuestionTypeDataEnd(flg, result, callback) {
    App.unblockUI('#lay-out');
    /*flg = true;
    result = {code:200, message:"", questiontypelist:[
        {questiontypeid:"1", questiontype:"查重经验",time:"20191220111111"},
        {questiontypeid:"2", questiontype:"论文修改",time:"20191220111111"},
        {questiontypeid:"3", questiontype:"论文协作",time:"20191220111111"},
    ]};*/
    if(flg){
        if (result && result.code == SUCCESS) {
            var questiontypelist = result.questiontypelist;
            questionTypeSelectBuild($("#questiontype, #questiontypeadd"), questiontypelist);
        }
    }
}

function questionTypeSelectBuild(id, list){
    id.empty();
    for (var i = list.length - 1;  i >=0 ; i--) {
        id.prepend('<option value="' + list[i].questiontypeid + '">' + list[i].questiontype + '</option>');
    }
    id.prepend('<option value="" selected>请选择</option>');
}
