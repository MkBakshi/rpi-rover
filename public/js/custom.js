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
  if(screen.width > 850){
	  var leftSliderL = document.getElementById("left-slider-l");
	  leftSliderL.addEventListener("change", function() { //add event listener for when checkbox changes
		socket.emit("leftSlider", Number(this.value)); //send button status to server (as 1 or 0)
	  });
	  var rightSliderL = document.getElementById("right-slider-l");
	  rightSliderL.addEventListener("change", function() { //add event listener for when checkbox changes
		socket.emit("rightSlider", Number(this.value)); //send button status to server (as 1 or 0)
	  });		 
  }else{
	  var leftSliderP = document.getElementById("left-slider-p");
	  leftSliderP.addEventListener("change", function() { //add event listener for when checkbox changes
		socket.emit("leftSlider", Number(this.value)); //send button status to server (as 1 or 0)
	  });
	  var rightSliderP = document.getElementById("right-slider-p");
	  rightSliderP.addEventListener("change", function() { //add event listener for when checkbox changes
		socket.emit("rightSlider", Number(this.value)); //send button status to server (as 1 or 0)
	  });
  }
});

socket.on('leftSlider', function (data) { //get button status from client
  if(screen.width > 850){
	  document.getElementById("left-slider-l").value = data;	
      socket.emit("leftSlider", data);	  
  }else{
	  document.getElementById("left-slider-p").value = data;
	  socket.emit("leftSlider", data);
  }
});

socket.on('rightSlider', function (data) { //get button status from client
  if(screen.width > 850){
	  document.getElementById("right-slider-l").value = data;	
      socket.emit("rightSlider", data);	  
  }else{
	  document.getElementById("right-slider-p").value = data;
	  socket.emit("rightSlider", data);
  }
});