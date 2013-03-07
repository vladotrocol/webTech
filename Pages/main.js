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

function sizeElements(){
	resEl(h.topBar, 0, 0, window.innerHeight/20+1, window.innerWidth);
	resEl(h.cWrapper, h.topBar.height, 0, window.innerHeight-h.topBar.height, window.innerWidth);
	resEl(h.sideBar, 0, 0, window.innerHeight - h.topBar.height -2, window.innerWidth*12/100);
	resEl(h.rescalerL, 0, h.sideBar.width*95/100+3, h.sideBar.height,window.innerWidth/100);
	resEl(h.editorBox, 0, 1, h.cWrapper.height-2, h.cWrapper.width/2- h.rescalerL.width/2);
	resEl(h.rescalerR, 0, h.editorBox.width+1, h.editorBox.height, h.rescalerL.width);
	resEl(h.previewBox, 0,h.rescalerR.left+h.rescalerR.width, h.editorBox.height, h.editorBox.width-3);
}

function resizeElements(){
	for(var el in h){
		h[el].Width(h[el].initWidth*window.innerWidth/wW-1);
		h[el].Height(h[el].initHeight*window.innerHeight/wH-1);
		h[el].Top(h[el].initTop*window.innerHeight/wH-1);
		h[el].Left(h[el].initLeft*window.innerWidth/wW-1);
	}
}


function initHtml(){
	initElements();
	sizeElements();
	initSizeHtml();
}

//Resize

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

function resizeLHtml(){
	if(h.rescalerL.left+D1.x>1&&h.rescalerL.left+D1.x<h.rescalerR.left-h.rescalerR.width-1){
		h.rescalerL.Left(h.rescalerL.left+D1.x);
		h.sideBar.Width(h.sideBar.width+D1.x);
		h.editorBox.Left(h.editorBox.left+D1.x);
		h.editorBox.Width(h.editorBox.width-D1.x);
	}
}

function resizeRHtml(){
	if(h.rescalerR.left+D2.x<window.innerWidth-h.rescalerR.width-1&&h.rescalerR.left+D2.x>h.rescalerL.left+h.rescalerL.width+1){
		h.rescalerR.Left(h.rescalerR.left+D2.x);
		h.editorBox.Width(h.editorBox.width + D2.x);
		h.previewBox.Left(h.previewBox.left+D2.x);
		h.previewBox.Width(h.previewBox.width-D2.x);
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
		h.topBar.el.innerHTML =md+" " + mLo + " "+ mRo + " " + lR+ " " + rR;
		P0 = getMouseWin(e);
	}
}

function mUp(e){
	md = false;
	lR = false;
	rR = false;
	D0.x = 0;
	D0.y = 0;
	D1.x = 0;
	D1.y = 0;
}

function mMove(e){
	h.topBar.el.innerHTML =md+" " + mLo + " "+ mRo + " " + lR+ " " + rR;
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
}

//Listeners
window.onload = viewDidLoad;
window.onresize = viewDidResize;