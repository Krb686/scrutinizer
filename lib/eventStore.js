//Exports


//Imports
var amqp = require('amqp');
var NanoTimer = require('nanotimer');

var EventStore = {
    'start': function(callback){
        var connection = amqp.createConnection({host:'localhost'});
        
        //Setup queue and subscriber for incoming sensor messages
        connection.on('ready', function(){
            queueEventStore = connection.queue('ES', {autoDelete:true}, function(queue){
                console.log('#4: Event Store queue created.');
                
                queueEventStore.bind('aggregator', 'data');
                
                var msgCount = 0;

                queueEventStore.subscribe(function(msg){
                   msgCount++;
                   EventStore.events.push(msg);
                });
                
                callback();
            });

            
        
        });     
    },
    'events':[]
};

module.exports = EventStore;