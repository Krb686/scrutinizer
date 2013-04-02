

var amqp = require('amqp');
var NanoTimer = require('nanotimer');


var Aggregator = {
    'start':function(callback){
      //Create connection
        var connection = amqp.createConnection({host:'localhost'});

        //Setup queue and subscriber for incoming sensor messages
        connection.on('ready', function(){
            queueTMS = connection.queue('TMS', {autoDelete:true}, function(queue){
                console.log('#1: TMS Queue created.');
                
                aggregatorExchange = connection.exchange('aggregator', {'type':'fanout', 'autoDelete':true}, function(exchange){
                    console.log('#2: Aggregator Exchange created.');
                    
                    
                    
                    var msgCount = 0;
                    
                    queueTMS.subscribe(function(msg){
                        msgCount++;
                        console.log('Aggregator received msg #' + msgCount + ' from sensor # ' + msg.sensorId);
                        
                        //Aggregation would be done here, for different message types across sensors.
                        //
                        //
                        
                        
                        //Re-emit 'UCE, uniform contact event to all subscribed listeners
                        aggregatorExchange.publish('data', msg);
                        
                    });
                    
                    callback();
                    
                });
                
                queueError = connection.queue('ERROR', {autoDelete:'true'}, function(queue){
                    console.log('Error queue started');
                    
                    queue.subscribe(function(msg){
                        console.log('Received error!!!');
                    });
                });
            
            });
        });
       
    }      
};

module.exports = Aggregator;


