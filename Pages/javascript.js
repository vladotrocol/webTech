var wrapper;
var editorBox;
var previewBox;
var topBar;
var sideBar;

window.onload = viewDidLoad;
window.onresize = viewDidResize;

function viewDidLoad(){	
	wrapper = document.getElementById("boxesWrapper");
	editorBox = document.getElementById("editorBox");
	previewBox = document.getElementById("previewBox");
	topBar = document.getElementById("topBar");
	sideBar = document.getElementById("sideBar");

	topBar.style.height = window.innerHeight/20 + "px";
	sideBar.style.width = window.innerWidth*12/100 + "px";

	wrapper.style.height = window.innerHeight -topBar.style.height.split("px")[0] -1+ "px";
	wrapper.style.width = window.innerWidth - sideBar.style.width.split("px")[0] -1+ "px";
	wrapper.style.top = topBar.style.height;
	wrapper.style.left = sideBar.style.width;

	editorBox.style.height = wrapper.style.height.split("px")[0]-10+"px";
	
	previewBox.style.height = wrapper.style.height.split("px")[0]-10+"px";
	previewBox.style.left = wrapper.style.width.split("px")[0]/2 +"px";
}

function viewDidResize(){
	// alert(topBar.style.height.split("px")[0] + "px");
	topBar.style.height = window.innerHeight/20 + "px";	
	sideBar.style.width = window.innerWidth*12/100 + "px";

	wrapper.style.height = window.innerHeight -topBar.style.height.split("px")[0] -1 + "px";
	wrapper.style.width = window.innerWidth - sideBar.style.width.split("px")[0] -1 + "px";
	wrapper.style.top = topBar.style.height.split("px")[0] + "px";
	wrapper.style.left = sideBar.style.width.split("px")[0] + "px";

	editorBox.style.height = wrapper.style.height.split("px")[0]-10+"px";
	
	previewBox.style.height = wrapper.style.height.split("px")[0]-10 +"px";
	previewBox.style.left = wrapper.style.width.split("px")[0]/2 +"px";
}

