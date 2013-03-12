var amqp = require('amqp');
var NanoTimer = require('nanotimer');


var CentralScrutinizer = {
    'start':function(){
        var timer = new NanoTimer();

        var connection = amqp.createConnection({host:'localhost'});

        connection.on('ready', function(){
            
        });
      
    }
};
