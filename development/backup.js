/**
 * Created by kvins on 02/05/2016.
 */

var cmdSys = require('./cmd_sys');
var time = require('./times');
var fs = require("fs");

var oldBackups;
var newBackups;
var i = 0;
var t;
var setup;
var number_config;

var backup = function(){
    for(var n=0;n<=number_config-1;n++) {
        var date = time.date();
        newBackups[n][i] = setup.filename(n) + "_" + date + setup.extension(n);
        var command = 'cp ' + setup.path_src(n) + setup.filename(n) + setup.extension(n) +" "+ setup.path_copy(n) + newBackups[n][i];
        cmdSys.process(command);
        if (oldBackups[n][i] != '') {
            command = 'rm -f ' + setup.path_copy(n) + oldBackups[n][i];
            cmdSys.process(command);
            command = 'sshpass -p ' + setup.pwd_dest(n) + ' scp -r ' + setup.path_copy(n) + newBackups[n][i] + ' ' + setup.user_dest(n) + '@' + setup.host(n) + ':' + setup.path_dest(n);
            cmdSys.process(command);
            command = 'sshpass -p ' + setup.pwd_dest(n) + ' ssh ' + setup.user_dest(n) + '@' + setup.host(n) + ' rm -f ' + setup.path_dest(n) + oldBackups[n][i];
            cmdSys.process(command);
            fs.appendFile('BackupService.log', "Backup effectué : " + newBackups[n][i] + "\n");
        }
        else {
            command = 'sshpass -p ' + setup.pwd_dest(n) + ' scp -r ' + setup.path_copy(n) + newBackups[n][i] + ' ' + setup.user_dest(n) + '@' + setup.host(n) + ':' + setup.path_dest(n);
            cmdSys.process(command);
            fs.appendFile('BackupService.log', "Backup effectué : " + newBackups[n][i] + "\n");
        }
        oldBackups[n][i] = newBackups[n][i];
    }
    i>=setup.number_backups()-1?i=0:i++;
};

exports.start = function(s){
    setup = s;
    t = time.timer(setup.hour(),setup.minute(),setup.second());
    number_config = setup.len();
    oldBackups = new Array();
    newBackups = new Array();
    for(var a=0;a<=number_config;a++) {
        oldBackups[a] = new Array(setup.number_backups());
        for (var b = 0; b < setup.number_backups(); b++){
            oldBackups[a][b] = '';
        }
    }
    for(var c=0;c<=number_config;c++) {
        newBackups[c] = new Array(setup.number_backups());
        for (var d = 0; d < setup.number_backups(); d++){
            newBackups[c][d] = '';
        }
    }

    backup();
    setInterval(backup, t);
};
