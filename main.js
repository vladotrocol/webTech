// HTML Elements
var h = {
	topBar: "topBar",
	sideBar: "sideBar",
	rescalerL: "rescalerL",
	cWrapper: "cWrapper",
	editorBox: "editorBox",
	rescalerR: "rescalerR",
	previewBox: "previewBox",
	logo: "logo"
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

		newSeparator.src = ".\\Images\\separator.png";
		newSeparator.style.top = ((i+1)*h.topBar.height*window.innerWidth/wW) + "px";
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
	resEl(h.logo, h.topBar.height/10, 0, h.topBar.height/2, h.sideBar.width);
	h.logo.Font(h.topBar.height*2/3);
}

function resizeInjectedElements(){
	var seps = document.getElementsByClassName("lineSeparator");
	for(var i=0; i<seps.length;i++){
		if(window.innerHeight>480){
			seps[i].style.top = ((i+1)*h.topBar.height) + "px";
		}
		if(window.innerWidth>640){
			seps[i].style.width = (parseInt(h.sideBar.width,10)-3)+"px";
		}
	}
}

function resizeFonts(){
	h.logo.Font(h.logo.initFont*window.innerHeight/wH);
}

function resizeElements(){
	for(var el in h){
		if(window.innerWidth>640){
			h[el].Width(h[el].initWidth*window.innerWidth/wW);
			h[el].Left(h[el].initLeft*window.innerWidth/wW);
		}
		if(window.innerHeight>480){
			h[el].Height(h[el].initHeight*window.innerHeight/wH);
			h[el].Top(h[el].initTop*window.innerHeight/wH);
			resizeFonts();
		}
	}
	resizeInjectedElements();
}


function initHtml(){
	initElements();
	sizeElements();
	initSizeHtml();
	generateSeparators(3);
	addEditContentWrappers();
}

//Adding content

var editingEls=new Array();
//Left side
function addEditContentWrapper(heightD, widthD){
	var newDiv = document.createElement("div");
	var inner = document.getElementById("innerE");
	newDiv.id = "L"+(editingEls.length+1);
	inner.appendChild(newDiv);
	var d = new htmlEl("L"+(editingEls.length+1));
	d.init();
	d.el.className = "wrapper shadow";
	d.Width(widthD);
	d.Height(heightD);
	d.el.style.marginBottom = h.editorBox.height*5/100+"px";
	d.initSize();
	d.Width(widthD*h.editorBox.width/100);
	d.Height(heightD*h.editorBox.height/100);
	editingEls.push(d);
}

function computeMaxHolderWidth(){
	var max=0;
	for(var el in editingEls){
		if(editingEls[el].width>max){
			max=editingEls[el].width;
		}
	}
	document.getElementById("innerE").style.width=max+"px";
}

function addEditContentWrappers(){
	addEditContentWrapper(10, 81);
	addEditContentWrapper(5, 70);
	addEditContentWrapper(30, 81);
	computeMaxHolderWidth();
}

function resizeEditContentWrappers(){
	for(var el in editingEls){
		if(window.innerWidth>640){
			editingEls[el].Width(editingEls[el].initWidth*h.editorBox.width/100);
		}
		if(window.innerHeight>480){
			editingEls[el].Height(editingEls[el].initHeight*h.editorBox.height/100);
		}
	}
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
	resizeEditContentWrappers();
	computeMaxHolderWidth();
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