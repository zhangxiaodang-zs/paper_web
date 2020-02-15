function rabbitMQConnect(routingKey1, routingKey2) {
    var ws;
    // Stomp.js boilerplate
    ws = new WebSocket('ws://' + wrabbitMQIP + ":" + wrabbitMQPort + '/ws');
    // Init Client
    var client = Stomp.over(ws);

    // SockJS does not support heart-beat: disable heart-beats
    client.heartbeat.outgoing = 300000; //5分钟
    client.heartbeat.incoming = 0;
    client.debug = on_debug();

    // Declare on_connect
    var on_connect = function(x) {
        if(routingKey1 != ""){
            client.subscribe("/exchange/login/login." + routingKey1, function(d) {
                on_contentFresh(d.body, 0);
            });
        }
        if(routingKey2 != "") {
            client.subscribe("/exchange/payment/payment." + routingKey2, function (d) {
                on_contentFresh(d.body, 1);
            });
        }
    };

    // Declare on_error
    var on_error =  function() {
        console.log('error');
        rabbitMQConnect(routingKey1, routingKey2)
    };

    // Conect to RabbitMQ
    client.connect(rabbitMQUser, rabbitMQPassword, on_connect, on_error, '/');
}

var on_contentFresh = function(m, type){
    //更新页面数据
    console.log("on_subscribe:    "+ m);
    m = JSON.parse(m);
    switch(type){
        case 1:
            alertDialog("包月支付成功！");
            $("#paycode-modal").modal('hide');
            vip = "true";
            endtime = m.endtime;
            vipTimeDisplay();
            //存储到session中
            userInfoSave();
            break;
    }
};

var on_debug = function(){
    return print = function(m, p) {
        p = (p === undefined) ? '' : JSON.stringify(p);
        //记录log?
        console.log(m + ' ' + p);
    };

};