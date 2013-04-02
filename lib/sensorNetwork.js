

var amqp = require('amqp');
var NanoTimer = require('nanotimer');

var SensorNetwork = {
    'start':function(){
        var timer = new NanoTimer();
        var sensors = [];
        var numSensors = 5;

        var sensorId = 1;
        var time = 123532;
        var lat = 35;
        var lon = -122;
        var speedMPH = 25;
        var angle = 277;
        var date = 180113;
  
        for(var i=0;i<numSensors;i++){
            var sensor = {
                  'id':sensorId,
                  "data":{
                      'sensorId': sensorId,
                      'type':'$GPRMC',
                      'utcTime':time,
                      'alertCode':'A',
                      'lat':lat,
                      'latHeading':'N',
                      'lon':lon,
                      'lonHeading':'W',
                      'speedMPH':speedMPH,
                      'angle':angle,
                      'date':date
                      }
            };
            sensors.push(sensor);
            sensorId++;
        }
        


        var connection = amqp.createConnection({host:'localhost'});

        connection.on('ready', function(){
            
            timer.setInterval(function(){
                for(var i=0;i<numSensors;i++){
                    connection.publish('TMS', sensors[i].data);
                }
                
                console.log('\ntransmit');
            }, '3s');
        });
    },
    
};

module.exports = SensorNetwork;


