/**
 * Created by kvins on 26/04/2016.
 */
var exec = require('child_process').exec;
var time = require('./time');
var fs = require("fs");

/* Prevoir un systeme de messagerie */


var handleException = function(msg){
    fs.appendFile('BackupService_error.log',msg);
    console.error('\n\nREAD THE BackupService_error.log');
    throw new Error(msg);
};

exports.process = function(command, callback){
    exec(command, function(e,out,err){
        if(e !== null) {
            handleException(time.date() + ":\n" + e + '\n');
        }
        if(out !== '')
            console.log(out);

        if(callback != undefined)
            callback();
    });
};