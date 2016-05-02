/**
 * Created by kvins on 27/04/2016.
 */

var fs = require("fs");

var setup;
var filename = "";

exports.init = function(fn,callback){
    filename = fn;
    fs.exists(filename,function(isExist) {
        if(isExist){
            setup = JSON.parse(fs.readFileSync(filename));
            callback();
        }
        else{throw new Error('Nothing setup file JSON.');}
    });
};

exports.len = function(){
    return setup.config.length;
};

exports.number_backups = function() {
    return setup.number_backups;
};

exports.hour = function() {
    return setup.hour;
};

exports.minute = function() {
    return setup.minute;
};

exports.second = function() {
    return setup.second;
};

exports.name = function(index) {
    return setup.config[index].name;
};

exports.user_dest = function(index) {
    return setup.config[index].user_dest;
};

exports.pwd_dest = function(index) {
    return setup.config[index].pwd_dest;
};

exports.host = function(index) {
    return setup.config[index].host;
};

exports.path_src = function(index) {
    return setup.config[index].path_src;
};

exports.path_copy = function(index) {
    return setup.config[index].path_copy;
};

exports.path_dest = function(index) {
    return setup.config[index].path_dest;
};

exports.filename = function(index) {
    return setup.config[index].filename;
};

exports.extension = function(index){
    return setup.config[index].extension;
};