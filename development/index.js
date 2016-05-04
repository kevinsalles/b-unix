/**
 * Created by kvins on 26/04/2016.
 */
var setup = require('./setup');
var backup = require('./backup');
var recovery = require('./recovery');

exports.start = function(setupFile) {
    recovery.createFile();
    setup.init(setupFile, function(){backup.start(setup);});
};

exports.recovery = function(setupFile){
    setup.init(setupFile, function(){recovery.start(setup);});
};



