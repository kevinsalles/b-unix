/**
 * Created by kvins on 26/04/2016.
 */
var exec = require('child_process').exec;
var time = require('./times');
var fs = require("fs");

/* Prevoir un systeme de messagerie */


var handleException = function(msg){
    fs.appendFile('BackupService_error.log',msg);
    console.error(msg);
    console.error('READ THE BackupService_error.log');
    setTimeout(function(){process.exit(-1);},1000);
};

exports.process = function(command){
    exec(command, function(e,out,err){
        if(e !== null) {
            handleException(time.date() + ":\n" + e + '\n');
        }
        if(out !== '')
            console.log(out);
    });
};

exports.processC = function(command, callback){
    exec(command, function(e,out,err){
        if(e !== null) {
            handleException(time.date() + ":\n" + e + '\n');
        }
        if(out !== '')
            console.log(out);
        callback();
    });
};