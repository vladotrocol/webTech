// HTML Elements
var h = {
	topBar: "topBar",
	sideBar: "sideBar",
	rescalerL: "rescalerL",
	cWrapper: "cWrapper",
	editorBox: "editorBox",
	rescalerR: "rescalerR",
	previewBox: "previewBox"
};

var P0={x:0,y:0}, P1={x:0,y:0}, D1={x:0,y:0}, D2={x:0,y:0};
var md=false, mLo=false, mRo=false, lR=false, rR=false;
var wW, wH;

// // HTML Functions
function resEl(el, t, l, h, w){
	el.Top(t);
	el.Left(l);
	el.Height(h);
	el.Width(w);
}

function initElements(){
	for(var el in h){
		h[el] = new htmlEl(el)
		h[el].init();
	}
}

function initSizeHtml(){
	for(var el in h){
		h[el].initSize();
	}
}

function generateSeparators(n){

	var com = document.createComment("Separators");
	h.sideBar.el.appendChild(com);

	for(var i=0;i<n;i++){

		var newSeparator=document.createElement("img");

		newSeparator.src = "images\\separator.png";
		newSeparator.style.top = ((i+1)*50*window.innerWidth/wW) + "px";
		newSeparator.style.width = (parseInt(h.sideBar.width,10)-2)+"px";
		newSeparator.className = "lineSeparator";

		h.sideBar.el.appendChild(newSeparator);
	}
}

function sizeElements(){
	resEl(h.topBar, 0, 0, window.innerHeight/20+1, window.innerWidth);
	resEl(h.cWrapper, h.topBar.height-1, 0, window.innerHeight-h.topBar.height, window.innerWidth);
	resEl(h.sideBar, 0, 0, window.innerHeight - h.topBar.height -2, window.innerWidth*12/100);
	resEl(h.rescalerL, 0, h.sideBar.width, h.sideBar.height,window.innerWidth/200);
	resEl(h.editorBox, 0, window.innerWidth*12/100+1+h.rescalerL.width, h.cWrapper.height-2, (h.cWrapper.width - h.sideBar.width-h.rescalerL.width)/2);
	resEl(h.rescalerR, 0, h.editorBox.width+1+h.sideBar.width+h.rescalerL.width, h.editorBox.height, h.rescalerL.width);
	resEl(h.previewBox, 0,h.rescalerR.left+h.rescalerR.width, h.editorBox.height, h.editorBox.width-3-h.rescalerR.width);
}

function resizeInjectedElements(){
	//Resize injected html elements
	var seps = document.getElementsByClassName("lineSeparator");
	for(var i=0; i<seps.length;i++){
		if(window.innerHeight>480){
			seps[i].style.top = ((i+1)*50*window.innerWidth/wW) + "px";
		}
		if(window.innerWidth>640){
			seps[i].style.width = (parseInt(h.sideBar.width,10)-10)+"px";
		}
	}
}

function resizeElements(){
	for(var el in h){
		if(window.innerWidth>640){
			h[el].Width(h[el].initWidth*window.innerWidth/wW-1);
			h[el].Left(h[el].initLeft*window.innerWidth/wW-1);
		}
		if(window.innerHeight>480){
			h[el].Height(h[el].initHeight*window.innerHeight/wH-1);
			h[el].Top(h[el].initTop*window.innerHeight/wH-1);
		}
	}
	resizeInjectedElements();
}


function initHtml(){
	initElements();
	sizeElements();
	initSizeHtml();
	generateSeparators(3);
}

//Listener functions

function addListeners(){
	document.body.onmousedown = mDown;
	window.onmouseup = mUp;
	document.body.onmousemove = mMove;
	h.rescalerL.el.onmouseover = mLOver;
	h.rescalerR.el.onmouseover = mROver;
	h.rescalerL.el.onmouseout = mLOut;
	h.rescalerR.el.onmouseout = mROut;
}


function viewDidLoad(){
	wW = window.innerWidth;
	wH = window.innerHeight;
	initHtml();
	addListeners();
}

function viewDidResize(){
	resizeElements();
}

function setNewRPos(){
	h.rescalerL.initLeft = h.rescalerL.left;			
	h.rescalerR.initLeft = h.rescalerR.left;	

	h.editorBox.initLeft = h.editorBox.left;
	h.previewBox.initLeft = h.previewBox.left;	

	h.sideBar.initWidth = h.sideBar.width;
	h.editorBox.initWidth = h.editorBox.width;
	h.previewBox.initWidth = h.previewBox.width;
}

function resizeLHtml(){
	if(h.rescalerL.left+D1.x>1&&h.rescalerL.left+D1.x<h.rescalerR.left-h.rescalerR.width-1){
		h.rescalerL.Left(h.rescalerL.left+D1.x);
		h.sideBar.Width(h.sideBar.width+D1.x);
		h.editorBox.Left(h.editorBox.left+D1.x);
		h.editorBox.Width(h.editorBox.width-D1.x);
		resizeInjectedElements();
	}
}

function resizeRHtml(){
	if(h.rescalerR.left+D2.x<window.innerWidth-h.rescalerR.width-2&&h.rescalerR.left+D2.x>h.rescalerL.left+h.rescalerL.width+1){
		h.rescalerR.Left(h.rescalerR.left+D2.x);
		h.editorBox.Width(h.editorBox.width + D2.x);
		h.previewBox.Left(h.previewBox.left+D2.x);
		h.previewBox.Width(h.previewBox.width-D2.x);
		resizeInjectedElements();
	}
}

function mLOver(e){
	if(!rR){
		mLo=true;
		lR=true;
	}
}
function mROver(e){
	if(!lR){
		mRo=true;
		rR=true;
	}
}
function mLOut(e){
	if(!md){
		lR = false;
	}
	mLo=false;
}
function mROut(e){
	if(!md){
		rR = false;
	}
	mRo=false;
}

function mDown(e){
	if(mLo||mRo){
		md = true;
		P0 = getMouseWin(e);
	}
}

function mUp(e){
	md = false;
	if(!mLo){
		lR = false;
		// setNewRPos();
	}
	if(!mRo){
		rR = false;
		// setNewRPos();
	}
	D1.x = 0;
	D1.y = 0;
	D2.x = 0;
	D2.y = 0;
}

function mMove(e){
		h.topBar.el.innerHTML =h.rescalerL.initLeft+ " " + h.rescalerL.left;//to be removed
	if(md){
		P1 = getMouseWin(e);
		if(lR){
			D1.x = P1.x-P0.x;
			resizeLHtml();	
		}
		else if(rR){
			D2.x = P1.x-P0.x;
			resizeRHtml();
		}
		P0.x = P1.x;
	}
	if(lR||rR){
		document.body.style.cursor="e-resize";
	}
	else{
		document.body.style.cursor="default";
	}
}

//Listeners
window.onload = viewDidLoad;
window.onresize = viewDidResize;