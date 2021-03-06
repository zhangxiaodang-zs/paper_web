﻿/**
 * Created by Administrator on 2019/2/19.
 */


var webUrl = "http://www.biye.com.cn/";

var wrabbitMQIP = "47.104.231.221";
var wrabbitMQPort = "15674";
var rabbitMQUser = "zsdev";
var rabbitMQPassword = "zsdev";
var rabbitMQQueue = "login";

const TableLanguage = {
        "aria": {
            "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
        },
        "emptyTable": "暂无数据",
        "info": "当前显示第 _START_ 到 _END_ 项，共 _TOTAL_项",
        "infoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "lengthMenu": "每页 _MENU_ 条",
        "search": "搜索:",
        "zeroRecords": "没有匹配的数据",
        "paginate": {
            "previous":"上一页",
            "next": "下一页",
            "last": "首页",
            "first": "末页",
            "page": "第",
            "pageOf": "共"
        },
        "processing": "正在加载中......"
    };
const TableLengthMenu = [
        [10, 20, 30, 50, -1],
        [10, 20, 30, 50, "所有"] // change per page values here
    ];

var PageLength = 10;
//测试数据
var userMenuList = {
    menulist:[
        {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
            "menulist":[
                {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
            ]
        },
        {"menuid":"powermanager","menutype":0,sort:"0", power:"1", "menuname":"权限管理","url":"", menuicon:"icon-diamond",
            "menulist":[
                {"menuid":"menu","menutype":1,sort:"0", power:"1", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                {"menuid":"rolepower","menutype":1,sort:"1", power:"1", "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                {"menuid":"userpower","menutype":1,sort:"2", power:"1", "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
            ]
        },
        {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-badge",
            "menulist":[
                {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
            ]
        },
        {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-envelope-letter",
            "menulist":[
                {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
            ]
        },
        {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-screen-desktop",
            "menulist":[
                {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
            ]
        },
        {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-picture",
            "menulist":[
                {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
            ]
        }
    ]
};