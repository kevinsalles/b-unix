/**
 * Created by kvins on 26/04/2016.
 */

exports.timer = function(h, m, s){
    var seconds 	= 1000*s;
    var minutes 	= 60000*m;
    var hours 	    = 3600000*h;
    return (hours+minutes+seconds);
};

exports.date = function(){
    var temp = new Date();
    return (temp.getDate().toString() + "-" +
    temp.getMonth().toString() + "-" +
    temp.getFullYear().toString() + "_" +
    temp.getHours().toString() + "-" +
    temp.getMinutes().toString() + "-" +
    temp.getSeconds().toString());
};