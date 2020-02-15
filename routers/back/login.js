/**
 * Created by Administrator on 2019/2/18.
 */
var express = require('express');
var router = express.Router();
var log4js = require("./../../log");
const logger = log4js.logger('http');

router.get('/',function(req,res,next){
    console.info(req.url);
    logger.info(req.url);
    res.render('back/login');
});

router.get('/login',function(req,res,next){
    res.render('back/login');
});

router.post('/main',function(req,res,next){
    var uname = req.body.username;
    req.session["ywtUname" + uname] = uname;
    req.session["ywtLogin" + uname] = req.body.loginsucc;
    //req.session["ywtUname" + uname] = req.body.username; // 登录成功，设置 session
    //req.session["ywtLogin" + uname] = req.body.loginsucc; // 登录成功，设置 session
    res.render('back/main', {
        menu: 'main',
        loginsucc: req.session["ywtLogin" + uname]
    });
});

router.get('/logout',function(req,res){
    var uname = req.query.username;
    req.session["ywtUname" + uname] = "";
    req.session["ywtLogin" + uname] = "";
    //req.session.destroy();
    res.redirect('/back/login');
});


router.get('/main',function(req,res,next){
   logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/main', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

router.get('/user',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    logger.info("usersession" + JSON.stringify(req.session));
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/user/user', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});


router.get('/userpower',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/power/userpower', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});


router.get('/rolepower',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/power/rolepower', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});



router.get('/role',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/user/role', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

router.get('/password',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/user/password', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

router.get('/wxuser',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/service/wxuser', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

router.get('/card',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/service/card', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

router.get('/order',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/service/order', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});


router.get('/money',function(req,res,next){
    logger.info(req.url);
    var uname = req.query.username;
    if(req.session["ywtUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('back/money/money', {
            menu: req.url.substr(1),
            loginsucc: req.session["ywtLogin" + uname]
        });
    }else{
        res.redirect('/back/login');
    }
});

module.exports = router;