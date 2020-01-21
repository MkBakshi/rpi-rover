// Listen for orientation changes
var land = $('#landscape-view');
var port = $('#portrait-view');

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