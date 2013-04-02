var aggregator = require('./aggregator.js');
var centralScrutinizer = require('./centralScrutinizer.js');
var eventStore = require('./eventStore.js');
var sensorNetwork = require('./sensorNetwork.js');



aggregator.start(function(){
    centralScrutinizer.start(function(){
        
        eventStore.start(function(){
            sensorNetwork.start();
        });
        
        
        
        
    });
    
    
});


