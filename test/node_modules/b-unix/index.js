/**
 * Created by kvins on 26/04/2016.
 */
var setup = require('./setup');
var backup = require('./backup');
var recovery = require('./recovery');

/*if (process.argv.length <= 2) {
    console.log("BackupService need a parameter like -b or -r.");
    console.log("\t-b\t:start automatically backup with the JSON file parameters.");
    console.log("\t-r\t:allows to recovery backups from the remote server. \n");
    process.exit(-1);
}

var init = function() {
    var param = process.argv[2];

    if (param == "-b")
        backup.start(setup);
    if (param == "-r")
        recovery.start(setup);
};*/


exports.start = function(setupFile) {
    setup.init(setupFile, function(){backup.start(setup);});
};



