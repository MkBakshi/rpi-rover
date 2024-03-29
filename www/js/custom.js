// Listen for orientation changes
var land = $('#landscape-view');
var port = $('#portrait-view');
var socket = io(); //load socket.io-client and connect to the host that serves the page

function selectView(){
	//console.log(screen);
	if(screen.width > 850){
		 port.hide();
		 land.show();		 
	 }else{
		 port.show();
	     land.hide();
	 }
}

selectView();

window.addEventListener("orientationchange", function() {
	selectView();
}, false);

window.addEventListener("load", function(){ //when page loads
      var sliderLeft;
	  var sliderRight;
	  
	  //var distTop;
	  //var distLeft;
	  //var distRight;
	  
	  if(screen.width > 850){
		  sliderLeft = document.getElementById("left-slider-l");
		  sliderRight = document.getElementById("right-slider-l");
		  //distTop = document.getElementById("dist-top-l");
		  //distLeft = document.getElementById("dist-left-l");
		  //distRight = document.getElementById("dist-right-l");
	  }else{
		  sliderLeft = document.getElementById("left-slider-p");
		  sliderRight = document.getElementById("right-slider-p");
		  //distTop = document.getElementById("dist-top-p");
		  //distLeft = document.getElementById("dist-left-p");
		  //distRight = document.getElementById("dist-right-p");
	  }
	  
	  sliderLeft.addEventListener("change", function() { 
		socket.emit("leftSlider", Number(this.value)); 
	  });
	  
	  sliderRight.addEventListener("change", function() { 
		socket.emit("rightSlider", Number(this.value)); 
	  });
  
	socket.on('leftSlider', function (data) { 
	  //console.log("left: "+data);
	  sliderLeft.value = data;
	});

	socket.on('rightSlider', function (data) { 
	  //console.log("right: "+data);
	  sliderRight.value = data;
	});

	/*
	socket.on('distanceTop', function (data) {
		if(data > 100){
			distTop.style.background = 'green';
		} else if(data > 50){
			distTop.style.background = 'orange';
		} else {
			distTop.style.background = 'red';
		}
		distTop.innerHTML = Math.round(data) + " cm";	
		socket.emit("distanceTop", data);	  
	});

	socket.on('distanceLeft', function (data) {
		if(data > 100){
			distLeft.style.background = 'green';
		} else if(data > 50){
			distLeft.style.background = 'orange';
		} else {
			distLeft.style.background = 'red';
		}
		distLeft.innerHTML = Math.round(data) + " cm";	
		socket.emit("distanceLeft", data);	 
	});

	socket.on('distanceRight', function (data) { 
	    if(data > 100){
			distRight.style.background = 'green';
		} else if(data > 50){
			distRight.style.background = 'orange';
		} else {
			distRight.style.background = 'red';
		}
		distRight.innerHTML = Math.round(data) + " cm";	
	    socket.emit("distanceRight", data);	  
	});*/
	
	const { GamepadListener } = gamepad;
	const listener = new GamepadListener({
		button: {
			analog: false
		},
		stick: {
			precision: 2,
			deadZone: 0.1
		}
	});
	
	listener.on('gamepad:connected', event => {
		const { index, gamepad } = event.detail;
		console.log(`Controller ${index + 1} [${gamepad.id}] connected!`);
	});

	listener.on('gamepad:disconnected', event => {
		const { index } = event.detail;
		console.log(`Controller ${index + 1} disconnected!`);
	});

	listener.on('gamepad:0:axis:0', event => {
		const { index, stick, axis, value } = event.detail;
		console.log(`Controller ${index + 1} Sitck ${stick}, axis ${axis}: ${value}`);
		if(stick == 0){
			socket.emit("steering", (1-((1+value)/2))); 
		}else if(stick == 1){
			socket.emit("accelerate", Math.abs((1-value)/-2)); 
		}
	});

	listener.on('gamepad:0:button', event => {
		const { index, button, value, pressed } = event.detail;
		console.log(`Controller ${index + 1} Button ${button} Pressed: ${pressed} : ${value}`);
	});
				
	
    listener.start();

});

