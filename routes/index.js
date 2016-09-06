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
    modelsInfo.getPv(function (err, pv) {
        var pvNumb = pv.pvNumb.toString();
        if (pvNumb.length < 2) {
            pvNumb = '00000' + pvNumb;
        }
        else if (pvNumb.length < 3) {
            pvNumb = '0000' + pvNumb;
        }
        else if (pvNumb.length < 4) {
            pvNumb = '000' + pvNumb;
        }
        else if (pvNumb.length < 5) {
            pvNumb = '00' + pvNumb;
        }
        else if (pvNumb.length < 6) {
            pvNumb = '0' + pvNumb;
        }
        else if (pvNumb.length < 7) {
            pvNumb = pvNumb;
        }
        else {
            pvNumb = '99999';
        }
        res.render('index', {pvNumb: pvNumb});
    });
    modelsInfo.updatePv(function () {

    });
});

/*保存用户信息接口*/
router.post('/saveInfo', function (req, res, next) {
    var _Info = req.body;
    var tel = _Info.tel;
    var province = _Info.province;
    var city = _Info.city;
    var store = _Info.store;
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
    modelsInfo.getInfoByTel(tel, function (err, info) {
        if (info) {
            console.log('11111');
            res.send({error: 'error', msg: '该手机号码已申请试用'});
            return false;
        }
        else {
            modelsInfo.saveInfo({
                    tel: tel,
                    province: province,
                    city: city,
                    store: store,
                    ip: getClientIp(req)
                }, function () {
                    urllib.request('http://sdk999ws.eucp.b2m.cn:8080/sdkproxy/sendsms.action?cdkey=9SDK-EMY-0999-JESQN&password=403962&phone=' + tel + '&message=' + urlencode('【悠莱】2016年10月9日前凭短信至XXXXXXXXXX门店可享受免费美容咨询服务，领取【净透幻肤露&臻弹柔采水乳】试用装，领完即止。（转发无效）') + '&addserial=2632', {
                        method: 'GET',
                        dataType: 'json',
                        contentType: 'json'
                    }, function (err, data) {
                        console.log(data);
                        if(data==0){
                            res.send({error: 'succeed'});
                        }
                        else{
                            res.send({error: '短信发送失败'});
                        }
                    });
                }
            );
        }
    });
});

/*后台登入*/
router.post('/admin', function (req, res, next) {
    var adminUsername = req.body.adminUsername;
    var adminPassword = req.body.adminPassword;
    if (adminUsername == "admin" && adminPassword == "123") {
        req.session.admin = {'admin': 'admin'};//session保存到本地
        res.redirect('/admin_info');
        return;
    }
    else {
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
    else {
        modelsInfo.getAllInfo(function (err, info) {
            if (info) {
                res.render('admin_info', {admin: '数据表', tInfo: info});
                return false;
            }
            else {
                res.render('admin_info', {admin: '没有查询到数据'});
                return false;
            }
        });
    }
});

//时间格式转换方法
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*导出info数据*/
router.get('/outexcel', function (req, res, next) {
    if (!req.session || !req.session.admin) {
        res.redirect('/admin');
        return;
    }
    else {
        modelsInfo.getAllInfo(function (err, info) {
            var oInfo = info;
            var eArray = new Array();

            for (var i = 0; i < oInfo.length; i++) {
                var sstr = "{'手机号码':'" + oInfo[i].tel + "','省份':'" + oInfo[i].province + "','城市':'" + oInfo[i].city + "','门店':'" + oInfo[i].store + "','ip':'" + oInfo[i].ip + "','创建时间':'" + oInfo[i].create_at.Format("yyyy-MM-dd hh:mm:ss") + "'}";
                eArray.push(eval('(' + sstr + ')'));
            }

            res.xls('data.xlsx', eArray);

            res.render('admin_info', {admin: '数据表到处成功', tInfo: info, ol: '一共:' + oInfo.length + '条'});
        });
    }
});

module.exports = router;
