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
var pathname;

var question1 = function(callback){
    r.question('Entry the backup path name :  ', function(answer){
            pathname = answer;
            r.close();
            callback();
        }
    )};

var proc = promise.promisify(cmdSys.processC);
var user_question1 = promise.promisify(question1);

exports.start = function(setup ){
    var command = 'sshpass -p "123456" ssh root@192.168.219.133 ls ../home/mint2/Bureau/BackupMint1/bck';

    var p1 = proc(command).then(
        function(){return user_question1();},
        function(){throw new Error('Error');}
    );

    p1.then(
        function(){
            command = 'sshpass -p "123456" scp root@192.168.219.133:../home/mint2/Bureau/BackupMint1/bck/'+pathname+' newFile.txt';
            return proc(command);
        },
        function(){throw new Error('Error1');}
    );

};

exports.createFile = function() {
    if(!fs.exists('b-unix_recovery.js')) {
        var file = "var bunix = require('b-unix');\n\n" +
            "bunix.recovery('./setup.json');";
        fs.appendFile('b-unix_recovery.js', file);
    }
};
