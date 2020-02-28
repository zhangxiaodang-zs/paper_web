/**
 * Created by Administrator on 2019/2/18.
 */
var express = require('express');
var router = express.Router();
var log4js = require("./../../log");
const logger = log4js.logger('http');
var redis = require("redis");
var client = redis.createClient("6379", "47.104.231.221");//"47.104.231.221");
var visit = 0;
var zan = 0;

router.all('*', function(req, res, next){
    logger.info("获取访问量和点赞数");
    client.get(`visit`, function (err, data) {
        logger.info(err);
        logger.info(data);
        visit = Number(data);
        client.get('zan', function (err, data) {
            zan = Number(data);
            next();
        });
    });
});

router.get('/',function(req,res,next){
    logger.info(req.url);
    req.session.destroy();
    client.set('visit', visit + 1, function (err, data) {
        logger.info("访问量+1")
        res.render('front/index',{
            visit: visit + 1,
            zan: zan
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
    res.render('front/index',{
        openid: req.query.openid,
        nickname: req.query.nickname,
        headimgurl: req.query.headimgurl,
        vip: req.query.vip,
        free: req.query.free,
        code: req.query.code,
        endtime: req.query.endtime,
        visit: visit,
        zan: zan
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
        zan: zan
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
        zan: zan
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
        zan: zan
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
        zan: zan
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
        zan: zan
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
        zan: zan
    });
});
//新闻详情
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
        zan: zan
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
    res.send("");
});
router.post('/zan', function(req,res, next){
    logger.info("增加点赞量");
    var zanTemp = zan + 1;

    client.set('zan', zanTemp, function (err, data) {
        res.send({
            zan: zanTemp
        })
    });
});

module.exports = router;