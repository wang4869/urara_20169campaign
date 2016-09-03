var mongoose = require('mongoose');
//mongoose.connect('mongodb://huanfulu:huanfulu12345678@112.124.125.28:27017/huanfulu');
mongoose.connect('mongodb://127.0.0.1/urara');
var Schema = mongoose.Schema;

var info = new Schema({
    tel: {type: String},
    province: {type: String},
    city: {type: String},
    store: {type: String},
    ip: {type: String},
    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now}
});

var pv = new Schema({
    pvNumb: {type: Number}
});

var iInfo = mongoose.model('info', info);
var iPv = mongoose.model('pv', pv);

exports.getInfoByTel = function (tel, callback) {
    iInfo.findOne({'tel': tel}, callback);
};

exports.saveInfo = function (info, callback) {
    var submitInfo = new iInfo(info);
    submitInfo.save
    (
        callback
    );
};

//查询当前pv
exports.getPv = function (callback) {
    iPv.findOne(callback);
};
//新增pv
exports.savePv = function (pvNumb, callback) {
    var pvInfo = new iPv(pvNumb);
    pvInfo.save
    (
        callback
    );
};
//更新pv
exports.updatePv = function (callback) {
    iPv.update
    (
        {},
        {
            $inc: {
                pvNumb: 1
            }
        },
        callback
    );
};
