//Exports
exports = EventStore;

//Imports
var amqp = require('amqp');
var NanoTimer = require('nanotimer');

var EventStore = {
    var connection = amqp.createConnection({host:'localhost'});
    
    //Setup queue and subscriber for incoming sensor messages
    connection.on('ready', function(){
        queueTMS = connection.queue('TMS', {autoDelete:false}, function(queue){
            console.log('TMS Queue created!');
        });

        var msgCount = 0;

        queueTMS.subscribe(function(msg){
            msgCount++;
            console.log('Received msg ' + msgCount);
        });
    
    });        
};
