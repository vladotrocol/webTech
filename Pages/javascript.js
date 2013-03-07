// HTML Elements
var wrapper;
var editorBox;
var previewBox;
var topBar;
var sideBar;
var rescaler;

//Size Variables
var sideBarBoxHeight = 50;
var rescalerSize = 5;

window.onload = viewDidLoad;
window.onresize = viewDidResize;


function viewDidLoad(){

	wrapper = document.getElementById("boxesWrapper");
	editorBox = document.getElementById("editorBox");
	previewBox = document.getElementById("previewBox");
	topBar = document.getElementById("topBar");
	sideBar = document.getElementById("sideBar");
	rescaler = document.getElementById("rescaler");

	resizeHtml();
	generateSeparators(4);
}

function generateSeparators(n){

	var com = document.createComment("Separators");
	sideBar.appendChild(com);

	for(var i=0;i<n;i++){

		var newSeparator=document.createElement("img");

		newSeparator.src = "images\\separator.png";
		newSeparator.style.top = (parseInt(topBar.style.height.split("px")[0], 10) + (i+1)*sideBarBoxHeight) + "px";
		newSeparator.width = (parseInt(sideBar.style.width.split("px")[0],10) * (100-rescalerSize)/100) - 1;
		newSeparator.className = "lineSeparator";

		sideBar.appendChild(newSeparator);
	}
}

function sideBarRescaler(){
	
	rescaler.style.top = 0 + "px";
	rescaler.style.left = (parseInt(sideBar.style.width.split("px")[0],10) * (100-rescalerSize)/100) + "px";
	rescaler.style.height = (parseInt(sideBar.style.height.split("%")[0],10)) + "px";
	rescaler.style.width = (parseInt(sideBar.style.width.split("px")[0],10) * rescalerSize/100) + "px";
}

function resizeHtml(){
	topBar.style.height = window.innerHeight/20 + "px";
	topBar.style.width = window.innerWidth + "px";

	sideBar.style.width = window.innerWidth*12/100 + "px";
	sideBar.style.height = (window.innerHeight - parseInt(topBar.style.height.split("px")[0], 10)) + "px";
	sideBar.style.top = (parseInt(topBar.style.height.split("px")[0], 10)+1) + "px";

	wrapper.style.height = (window.innerHeight - parseInt(topBar.style.height.split("px")[0], 10)) + "px";
	wrapper.style.width = (window.innerWidth - parseInt(sideBar.style.width.split("px")[0], 10)) + "px";
	wrapper.style.top = topBar.style.height;
	wrapper.style.left = (parseInt(sideBar.style.width.split("px")[0], 10)+1) + "px";

	editorBox.style.height = wrapper.style.height.split("px")[0] + "px";
	editorBox.style.width = (parseInt(wrapper.style.width.split("px")[0],10)/2-1) + "px";

	previewBox.style.height = wrapper.style.height.split("px")[0] + "px";
	previewBox.style.left = (parseInt(wrapper.style.width.split("px")[0],10)/2) + "px";
	previewBox.style.width = (parseInt(wrapper.style.width.split("px")[0],10)/2-10) + "px";

	sideBarRescaler();
}

function viewDidResize(){
	resizeHtml();
}

