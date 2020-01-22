var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
const Gpio = require('pigpio').Gpio;

const motor1PWM = new Gpio(17, {mode: Gpio.OUTPUT});
const motor1CA = new Gpio(27, {mode: Gpio.OUTPUT});
const motor1CB = new Gpio(22, {mode: Gpio.OUTPUT});
const motor2PWM = new Gpio(18, {mode: Gpio.OUTPUT});
const motor2CA = new Gpio(23, {mode: Gpio.OUTPUT});
const motor2CB = new Gpio(24, {mode: Gpio.OUTPUT});

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  if(req.url == '/'){
	  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
		res.write(data); //write data from index.html
		return res.end();
	  });
  }else if(req.url.endsWith("bootstrap.min.css")){
	  fs.readFile(__dirname + '/public/css/bootstrap.min.css', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/css'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("custom.css")){
	  fs.readFile(__dirname + '/public/css/custom.css', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/css'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("bootstrap.min.js")){
	  fs.readFile(__dirname + '/public/js/bootstrap.min.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("jquery.min.js")){
	  fs.readFile(__dirname + '/public/js/jquery.min.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("socket.io.js")){
	  fs.readFile(__dirname + '/public/js/socket.io.js', function(err, data) { 
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		} 
		
		res.writeHead(200, {'Content-Type': 'text/javascript'}); 
		res.write(data); 
		return res.end();
	  });
  }else if(req.url.endsWith("custom.js")){
	  fs.readFile(__dirname + '/public/js/custom.js', function(err, data) { 
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
  socket.on('leftSlider', function(data) { //get leftSlider status from client
    leftValue = data;
	if(leftValue > 255){
		leftValue = (255-(511-leftValue));
		motor1CA.digitalWrite(0);
		motor1CB.digitalWrite(1);
	}else{
		leftValue = (255-leftValue);
		motor1CA.digitalWrite(1);
		motor1CB.digitalWrite(0);
	}
    motor1PWM.pwmWrite(leftValue);
  });
  
  socket.on('rightSlider', function(data) { //get leftSlider status from client
    rightValue = data;
	if(rightValue > 255){
		rightValue = (255-(511-rightValue));
		motor2CA.digitalWrite(0);
		motor2CB.digitalWrite(1);
	}else{
		rightValue = (255-rightValue);
		motor2CA.digitalWrite(1);
		motor2CB.digitalWrite(0);
	}
    motor2PWM.pwmWrite(rightValue);
  });
});

process.on('SIGINT', function () { //on ctrl+c
  motor1PWM.pwmWrite(0);
  motor1CA.digitalWrite(0);
  motor1CB.digitalWrite(0);
  motor2PWM.pwmWrite(0);
  motor2CA.digitalWrite(0);
  motor2CB.digitalWrite(0);
  process.exit(); //exit completely
});