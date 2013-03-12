exports = Aggregator;

var amqp = require('amqp');
var NanoTimer = require('nanotimer');


var Aggregator = {
    'start':function(){
      //Create connection
        var connection = amqp.createConnection({host:'localhost'});

        //Setup queue and subscriber for incoming sensor messages
        connection.on('ready', function(){
            queueTMS = connection.queue('TMS', {autoDelete:false}, function(queue){
                console.log('TMS Queue created!');
            });
            
            var msgCount = 0;
            
            queueTMS.subscribe(function(msg){
                msgCount++;
                console.log('Received msg ' + msgCount + ' from sensor # ' + msg.id);
                
                //Aggregation would be done here, for different message types across sensors.
                //
                //
                
                
                //Re-emit 'UCE, uniform contact event
                connection.publish('UCE', msg);
                
            });
            
        });
    }      
};



