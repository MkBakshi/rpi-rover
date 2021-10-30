var server = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(server); //require socket.io module and pass the http object (server)
var ip = require("ip");
const Gpio = require('pigpio').Gpio;

const PORT = 8080;
const MIN_SLIDER = 0;
const MAX_SLIDER = 511;
const MIN_SERVO = 1100;
const SERVO_RANGE = 800;
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
//const MSEC_PER_CM = 1e6/34321;

// bind gpio ports
// DC motor ports
const motor1PWM = new Gpio(17, {mode: Gpio.OUTPUT});
const motor1CA = new Gpio(27, {mode: Gpio.OUTPUT});
const motor1CB = new Gpio(22, {mode: Gpio.OUTPUT});
//const motor2PWM = new Gpio(18, {mode: Gpio.OUTPUT});
//const motor2CA = new Gpio(23, {mode: Gpio.OUTPUT});
//const motor2CB = new Gpio(24, {mode: Gpio.OUTPUT});

// Distance Sensor ports
//const trigger = new Gpio(26, {mode: Gpio.OUTPUT});
//const echo = new Gpio(19, {mode: Gpio.INPUT, alert: true});

// servo
const servo = new Gpio(13, {mode: Gpio.OUTPUT});
servo.servoWrite(0);

//trigger.digitalWrite(0); // Make sure trigger is low

server.listen(PORT); //listen to port 8080
console.log("Server listening at http://%s:%s", ip.address(), PORT);

function handler (req, res) { //create server
  if(req.url == '/'){
	  fs.readFile(__dirname + '/www/index.html', function(err, data) { //read file index.html in public folder
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
		res.write(data); //write data from index.html
		return res.end();
	  });
  }else if(req.url.endsWith("bootstrap.min.css")){
	  fs.readFile(__dirname + '/www/css/bootstrap.min.css', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/css'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("custom.css")){
	  fs.readFile(__dirname + '/www/css/custom.css', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/css'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("bootstrap.min.js")){
	  fs.readFile(__dirname + '/www/js/bootstrap.min.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("jquery.min.js")){
	  fs.readFile(__dirname + '/www/js/jquery.min.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("socket.io.js")){
	  fs.readFile(__dirname + '/www/js/socket.io.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("gamepad.js")){
	  fs.readFile(__dirname + '/www/js/gamepad.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("custom.js")){
	  fs.readFile(__dirname + '/www/js/custom.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var leftValue = 0; //static variable for current status
  var rightValue = 0; //static variable for current status
  var pulseWidth = Math.ceil(MIN_SERVO + (0.5 * SERVO_RANGE));
  socket.on('leftSlider', function(data) { //get leftSlider status from client
    //console.log("Received left slider data: "+data);
    leftValue = data;
	//pulseWidth = Math.ceil(MIN_SERVO + ((data/MAX_SLIDER) * SERVO_RANGE));
	/*if(leftValue > 255){
		leftValue = (255-(511-leftValue));
		motor1CA.digitalWrite(0);
		motor1CB.digitalWrite(1);
	}else{
		leftValue = (255-leftValue);
		motor1CA.digitalWrite(1);
		motor1CB.digitalWrite(0);
	}
    motor1PWM.pwmWrite(leftValue);
	*/
	  // servo test start
	  //console.log("writing "+pulseWidth+" pulse width to servo");
	  //servo.servoWrite(pulseWidth);
/*
	  pulseWidth += increment;
	  if (pulseWidth >= 2000) {
		increment = -100;
	  } else if (pulseWidth <= 1000) {
		increment = 100;
	  }*/
	  
	  // servo test end
  });
  
  socket.on('rightSlider', function(data) { //get leftSlider status from client
    //console.log("Received right slider data: "+data);
    rightValue = data;
	/*if(rightValue > 255){
		rightValue = (255-(511-rightValue));
		motor2CA.digitalWrite(0);
		motor2CB.digitalWrite(1);
	}else{
		rightValue = (255-rightValue);
		motor2CA.digitalWrite(1);
		motor2CB.digitalWrite(0);
	}
    motor2PWM.pwmWrite(rightValue);*/
  });
  
  socket.on('steering', function(data) { //get steering status from client
    //console.log("Steering: "+data);
	pulseWidth = Math.ceil(MIN_SERVO + (data * SERVO_RANGE));
	servo.servoWrite(pulseWidth);
  });
  
  socket.on('accelerate', function(data) { //get acceleration status from client
    //console.log("Accelerate: "+data);
  });
  
    /*const watchHCSR04 = () => {
	  let startTick;
	 
	  echo.on('alert', (level, tick) => {
		if (level == 1) {
		  startTick = tick;
		} else {
		  const endTick = tick;
		  const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
		  socket.emit('distanceTop', (diff / 2 / MSEC_PER_CM));
		}
	  });
	};
    watchHCSR04();
 
	// Trigger a distance measurement once per second
	setInterval(() => {
	  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
	}, 1000);
	//servo.servoWrite(500);
	*/
});

process.on('SIGINT', function () { //on ctrl+c
  motor1PWM.pwmWrite(0);
  motor1CA.digitalWrite(0);
  motor1CB.digitalWrite(0);
  /*motor2PWM.pwmWrite(0);
  motor2CA.digitalWrite(0);
  motor2CB.digitalWrite(0);*/
  //trigger.digitalWrite(0); 
  
  process.exit(); //exit completely
});