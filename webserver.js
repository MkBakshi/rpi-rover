var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module

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
  }else if(req.url.endsWith(".css")){
	  fs.readFile(__dirname + '/public/css/bootstrap.min.css', function(err, data) { 
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