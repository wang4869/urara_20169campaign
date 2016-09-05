var express = require('express');
var router = express.Router();
var modelsInfo = require('../models/info');
var urlencode = require('urlencode');
var urllib = require('urllib');

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

/* GET home page. */
router.get('/', function (req, res, next) {
    modelsInfo.getPv(function(err, pv){
        var pvNumb=pv.pvNumb.toString();
        if(pvNumb.length<2){
            pvNumb='00000'+pvNumb;
        }
        else if(pvNumb.length<3){
            pvNumb='0000'+pvNumb;
        }
        else if(pvNumb.length<4){
            pvNumb='000'+pvNumb;
        }
        else if(pvNumb.length<5){
            pvNumb='00'+pvNumb;
        }
        else if(pvNumb.length<6){
            pvNumb='0'+pvNumb;
        }
        else if(pvNumb.length<7){
            pvNumb=pvNumb;
        }
        else{
            pvNumb='99999';
        }
        res.render('index', {pvNumb: pvNumb});
    });
    modelsInfo.updatePv(function(){

    });
});

/*保存用户信息接口*/
router.post('/saveInfo', function (req, res, next) {
    var _Info = req.body;
    var tel=_Info.tel;
    var province=_Info.province;
    var city=_Info.city;
    var store=_Info.store;
    var pattern = /^1[3456789]\d{9}$/;

    if (tel == '' || !pattern.test(tel)) {
        res.send('tryPage', {error: '请输入正确的手机号码'});
        return false;
    }
    else if (province == '') {
        res.send('tryPage', {error: '请选择省份'});
        return false;
    }
    else if (city == '') {
        res.send('tryPage', {error: '请选择城市'});
        return false;
    }
    else if (store == '') {
        res.send('tryPage', {error: '请选择最近柜台'});
        return false;
    }
    modelsInfo.getInfoByTel(tel,function(err,info){
        if(info){
            console.log('11111');
            res.send({error: 'error',msg:'该手机号码已申请试用'});
            return false;
        }
        else{
            modelsInfo.saveInfo({
                    tel: tel,
                    province: province,
                    city: city,
                    store: store,
                    ip: getClientIp(req)
                }, function () {
                    res.send({error: 'succeed'});
                }
            );
        }
    });
});

/*后台登入*/
router.post('/admin', function (req, res, next) {
    var adminUsername=req.body.adminUsername;
    var adminPassword=req.body.adminPassword;
    if(adminUsername=="admin"&&adminPassword=="123"){
        req.session.admin = {'admin':'admin'};//session保存到本地
        res.redirect('/admin_info');
        return;
    }
    else{
        res.redirect('/');
        return;
    }
});

/*info数据*/
router.get('/admin_info', function (req, res, next) {
    if (!req.session || !req.session.admin) {
        res.redirect('/admin');
        return;
    }
    else{
      modelsInfo.getAllInfo(function(err,info){
          if(info){
              res.render('admin_info', {admin:'数据表',tInfo:info});
              return false;
          }
          else{
            res.render('admin_info', {admin:'没有查询到数据'});
            return false;
          }
      });
    }
});

module.exports = router;
