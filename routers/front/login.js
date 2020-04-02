/**
 * Created by Administrator on 2019/2/18.
 */
var express = require('express');
var router = express.Router();
var log4js = require("./../../log");
const logger = log4js.logger('http');
var redis = require("redis");
var client = redis.createClient("6379", "127.0.0.1");//"47.104.231.221");
client.auth("biye@a?");
var visit = 0;

router.all('*', function(req, res, next){
    logger.info("获取访问量");
    client.get(`visit`, function (err, data) {
        logger.info(err);
        logger.info(data);
        visit = Number(data);
        next();
    });
});

router.get('/',function(req,res,next){
    logger.info(req.url);
    req.session.destroy();
    client.set('visit', visit + 1, function (err, data) {
        logger.info("访问量+1")
        res.render('front/index',{
            visit: visit + 1
        });
    })

});

router.get('/login', function(req, res, next){
    logger.info(req.url);
    req.session["openid"] = req.query.openid;
    req.session["nickname"] = req.query.nickname;
    req.session["headimgurl"] = req.query.headimgurl;
    req.session["vip"] = req.query.vip;
    req.session["free"] = req.query.free;
    req.session["code"] = req.query.code;
    req.session["endtime"] = req.query.endtime;
    req.session["thumbup"] = req.query.thumbup;
    res.render('front/index',{
        openid: req.query.openid,
        nickname: req.query.nickname,
        headimgurl: req.query.headimgurl,
        vip: req.query.vip,
        free: req.query.free,
        code: req.query.code,
        endtime: req.query.endtime,
        visit: visit,
        thumbup: req.query.thumbup
    });
});

router.post('/index',function(req,res,next){
    logger.info(req.url);
    logger.info( req.session["openid"]);
    res.render('front/index',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});

router.post('/download',function(req,res,next){
    logger.info(req.url);
    res.render('front/download',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});

router.post('/brand',function(req,res,next){
    logger.info(req.url);
    res.render('front/brand',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});

router.post('/question',function(req,res,next){
    logger.info(req.url);
    res.render('front/question',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});
//联系我们
router.post('/contact',function(req,res,next){
    logger.info(req.url);
    res.render('front/contact',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});
//行业新闻
router.post('/news',function(req,res,next){
    logger.info(req.url);
    res.render('front/news',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});
//新闻详情
// router.post('/news_info.html',function(req,res,next){
//     logger.info(req.url);
//     res.render('front/news_info.html',{
//         openid: req.session["openid"],
//         nickname: req.session["nickname"],
//         headimgurl :req.session["headimgurl"],
//         vip: req.session["vip"],
//         free: req.session["free"],
//         code: req.session["code"],
//         endtime: req.session["endtime"],
//         visit: visit,
//         thumbup: req.session["thumbup"]
//     });
// });

router.post('/news_info',function(req,res,next){
    logger.info(req.url);
    res.render('front/news_info',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});

//问题详情
// router.post('/question_info.html',function(req,res,next){
//     logger.info(req.url);
//     res.render('front/question_info.html',{
//         openid: req.session["openid"],
//         nickname: req.session["nickname"],
//         headimgurl :req.session["headimgurl"],
//         vip: req.session["vip"],
//         free: req.session["free"],
//         code: req.session["code"],
//         endtime: req.session["endtime"],
//         visit: visit,
//         thumbup: req.session["thumbup"]
//     });
// });
router.post('/question_info',function(req,res,next){
    logger.info(req.url);
    res.render('front/question_info',{
        openid: req.session["openid"],
        nickname: req.session["nickname"],
        headimgurl :req.session["headimgurl"],
        vip: req.session["vip"],
        free: req.session["free"],
        code: req.session["code"],
        endtime: req.session["endtime"],
        visit: visit,
        thumbup: req.session["thumbup"]
    });
});
router.post('/user/save', function(req,res, next){
    logger.info("存储用户信息");
    var vip = req.body.vip;
    logger.info("vip:" + vip)
    if(vip != undefined) {
        req.session["vip"] = vip;
    }
    var free = req.body.free;
    if(free != undefined) {
        req.session["free"] = free;
    }
    var endtime = req.body.endtime;
    if(endtime != undefined) {
        req.session["endtime"] = endtime;
    }
    var thumbup = req.body.thumbup;
    if(thumbup != undefined) {
        req.session["thumbup"] = thumbup;
    }
    res.send("");
});


module.exports = router;