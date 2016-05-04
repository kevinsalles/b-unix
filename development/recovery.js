/**
 * Created by kvins on 26/04/2016.
 */
const readline = require('readline');
var promise = require('bluebird');
var cmdSys = require('./cmd_sys');
var fs = require("fs");

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var user_question = function(question) {
    return new promise(function (resolve) {
        r.question(question, function (answer) {
                resolve(answer);
            }
        );
    });
};

var begin = function(setup){
    return new promise(function (resolve) {
        for(var i=0;i<=setup.len()-1;i++){
            console.log("No : "+i+" | name : "+setup.name(i));
        }
        resolve();
    });
};

var proc = promise.promisify(cmdSys.process);

exports.start = function(setup){

    var n = 0;

    begin(setup).then(
        function () {
            return user_question('Choose a backup name and enter the number :  ');
        }
    ).then(
        function (respond) {
            n = respond;
            var command = 'sshpass -p ' + setup.pwd_dest(n) + ' ssh ' + setup.user_dest(n) + '@' + setup.host(n) + ' ls ' + setup.path_dest(n);
            return proc(command);
        }
    ).then(
        function () {
            return user_question('Enter the backup file name :  ');
        }
    ).then(
        function (respond) {
            var command = 'sshpass -p '
                + setup.pwd_dest(n)
                + ' scp '
                + setup.user_dest(n)
                + '@'
                + setup.host(n)
                + ':'
                + setup.path_dest(n)
                + respond
                + " "
                + setup.filename(n)
                + setup.extension(n);
            return proc(command);
        }
    ).then(
        function () {
            console.log("Backup done!!!");
            return user_question('Do you want to continue the data recovery ? Entry q for quit or c for continue : ');
        }
    ).then(
        function (respond) {
            if(respond == 'c')
                exports.start(setup);
            else
                process.exit(0);
        }
    ).catch(function(err) {
        console.log(err);
        process.exit(-1);
    });

};

exports.createFile = function() {
    if(!fs.exists('b-unix_recovery.js')) {
        var file = "var bunix = require('b-unix');\n\n" +
            "bunix.recovery('./setup.json');";
        fs.writeFile('b-unix_recovery.js', file);
    }
};
