

var amqp = require('amqp');
var NanoTimer = require('nanotimer');


var CentralScrutinizer = {
    'start':function(callback){
        var timer = new NanoTimer();

        var connection = amqp.createConnection({host:'localhost'});
        
        this.connection = connection;

        connection.on('ready', function(){
            queueUCE = connection.queue('UCE', {autoDelete:true}, function(queue){
                console.log('#3: UCE Queue created.');
                
                queueUCE. ('aggregator', 'data');
                
                var msgCount = 0;
                
                queueUCE.subscribe(function(msg){
                    msgCount++;
                    console.log('Scrutinizer received UCE msg #' + msgCount + ' from aggregator');        
                });
                
                callback();
            });
        });
            
        
        timer.setTimeout(function(){
           CentralScrutinizer.detectError(); 
        }, '10s');
        
        
    },
    
    'detectError':function(){
        CentralScrutinizer.connection.publish('ERROR', 'null');
        console.log('sent error');
    }
};

module.exports = CentralScrutinizer;