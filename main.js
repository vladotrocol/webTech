// HTML Elements
var h = {
	topBar: "topBar",
	sideBar: "sideBar",
	rescalerL: "rescalerL",
	cWrapper: "cWrapper",
	editorBox: "editorBox",
	rescalerR: "rescalerR",
	previewBox: "previewBox",
	logo: "logo",
	signup: "signup",
	centeredText: "centeredText",
	centeredText2: "centeredText2",
	login: "login"
};

var l =  new Array();

var P0={x:0,y:0}, P1={x:0,y:0}, D1={x:0,y:0}, D2={x:0,y:0};
var md=false, mLo=false, mRo=false, lR=false, rR=false;
var wW, wH;
var darken,whiteWrap;

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
		newSeparator.style.width = (h.sideBar.width-2)+"px";
		newSeparator.style.height = (parseInt(h.sideBar.height/400,10))+ "px";
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
	resEl(h.signup, 0, h.topBar.width-h.sideBar.width*2/3, h.topBar.height, h.sideBar.width/2);
	resEl(h.login, 0, h.topBar.width-h.sideBar.width*7/6, h.topBar.height, h.sideBar.width/2);
	resEl(h.centeredText, h.topBar.height/3, 0, 0, h.sideBar.width/2);
	resEl(h.centeredText2, h.topBar.height/3, 0, 0, h.sideBar.width/2);
	h.logo.Font(h.topBar.height*2/3);
	h.centeredText.Font(h.topBar.height/3);
	h.centeredText2.Font(h.topBar.height/3);
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
	h.centeredText.Font(h.centeredText.initFont*window.innerHeight/wH);
	h.centeredText2.Font(h.centeredText.initFont*window.innerHeight/wH);
	resizeFormFonts();
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
			
		}
	}

	if(window.innerHeight>480){
		resizeFonts();
	}

	resizeInjectedElements();
}

function initLoginEls(){
	darken = document.createElement("div");
	whiteWrap = document.createElement("div");

	var username = document.createElement("input");
	var password = document.createElement("input");

	var userText = document.createTextNode("Email or username");
	var passText = document.createTextNode("Password");

	var topText = document.createTextNode("Log in using an Odemia account");
	var bottomText = document.createTextNode("Or");

	var top = document.createElement("label");
	var bot = document.createElement("label");

	var user = document.createElement("label");
	var pass = document.createElement("label");

	var fb = document.createElement("div");
	var gp = document.createElement("div");

	var submit = document.createElement("input");

	top.style.fontSize = h.logo.font*2/3+"px";
	bot.style.fontSize = h.logo.font*2/3+"px";
	user.style.fontSize = h.logo.font*3/4+"px";
	pass.style.fontSize = h.logo.font*3/4+"px";
	username.style.fontSize = h.logo.font+"px";
	password.style.fontSize = h.logo.font+"px";
	submit.style.fontSize = h.logo.font/2+"px";

	l.push({id:"user", el: user, initFont:parseInt(user.style.fontSize.split()[0],10)});
	l.push({id:"pass", el: pass, initFont:parseInt(pass.style.fontSize.split()[0],10)});
	l.push({id:"top", el: top, initFont:parseInt(top.style.fontSize.split()[0],10)});
	l.push({id:"bot", el: bot, initFont:parseInt(bot.style.fontSize.split()[0],10)});
	l.push({id:"username", el: username, initFont:parseInt(username.style.fontSize.split()[0],10)});
	l.push({id:"password", el: password, initFont:parseInt(password.style.fontSize.split()[0],10)});
	l.push({id:"submit", el: submit, initFont:parseInt(submit.style.fontSize.split()[0],10)});

	submit.type="submit";
	submit.value = "Login";
	submit.id = "loginBut";

	fb.className = "socialLogin";
	gp.className = "socialLogin";

	fb.id = "facebook";
	gp.id = "google";

	top.id = "loginOdemia";
	bot.id = "loginFb";

	user.id = "inputField";
	pass.id = "inputField2";

	username.type = "text";
	username.name = "username";
	username.placeholder = "username";
	username.className = "inputBox";

	password.type = "password";
	password.name = "Password";
	password.placeholder = "******";
	password.className = "inputBox";
	password.id = "inputBox2";

	whiteWrap.className = "loginForm";

	user.appendChild(userText);
	pass.appendChild(passText);

	top.appendChild(topText);
	bot.appendChild(bottomText);

	whiteWrap.appendChild(user);
	whiteWrap.appendChild(pass);

	whiteWrap.appendChild(submit);

	whiteWrap.appendChild(username);
	whiteWrap.appendChild(password);

	whiteWrap.appendChild(top);
	whiteWrap.appendChild(bot);

	whiteWrap.appendChild(fb);
	whiteWrap.appendChild(gp);

	darken.className = "darken";
	darken.onclick = removeDarken;
	submit.onclick=removeDarken;
	fb.onclick = removeDarken;
	gp.onclick = removeDarken;
}


function resizeFormFonts(){
	for(var i in l){
		l[i].el.style.fontSize = (l[i].initFont*window.innerHeight/wH)+"px";
	}
}

function initHtml(){
	initElements();
	sizeElements();
	initSizeHtml();
	generateSeparators(3);
	addEditContentWrappers();
	initLoginEls();
}

//Adding content

var editingEls=new Array();
//Left side
function addEditContentWrapper(heightD, widthD, a, font){
	var newDiv = document.createElement("div");
	var inner = document.getElementById("innerE");
	newDiv.id = "L"+(editingEls.length+1);
	inner.appendChild(newDiv);
	var d = new htmlEl("L"+(editingEls.length+1));
	d.init();
	if(a){
		d.el.className = "wrapperAlpha";
	}
	else{
		d.el.className = "wrapper shadowInner";
	}
	d.Width(widthD);
	d.Height(heightD);
	d.el.style.marginTop = h.editorBox.height*2/100+"px";
	d.initSize();
	d.Width(widthD*h.editorBox.width/100);
	d.Height(heightD*h.editorBox.height/100);
	if(font==-1){
		d.Font(d.height*2/3);
	}
	else{
		d.Font(d.height*font/100);
	}
	d.initFont = d.font;
	editingEls.push(d);
	l.push({id:"L"+(editingEls.length+1), el: d.el, initFont:d.initFont});
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

function addTextTo(s, i, c, w){
	var t = document.createTextNode(s);
	var cen = document.createElement("div");
	cen.className = "vCenter";
	// cen.style.backgroundColor = "#f00";
	cen.appendChild(t);
	cen.style.color=c;	
	editingEls[i].el.appendChild(cen);
	editingEls[i].el.style.display="table";	
	editingEls[i].el.style.textAlign="center";		
}

function addInput(p,i,w){
	var inn = document.createElement("input");
	inn.name = p;
	inn.placeholder =p;
	inn.size = w;
	inn.style.height = editingEls[i].height+ "px";
	editingEls[i].el.appendChild(inn);
}

function addEditContentWrappers(){
	addEditContentWrapper(5, 81, true, -1);
	addTextTo("Edit Your Question", 0, "#009b95");
	addEditContentWrapper(5, 81, true, 50);
	addTextTo("Header:", 1, "#888");
	addInput("my header",1,30);
	addEditContentWrapper(45, 81,false, 2);
	addEditContentWrapper(30, 81,false, 2);
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
		if(window.innerWidth>640&&window.innerHeight>480){
			editingEls[el].el.style.marginTop = h.editorBox.height*2/100+"px";
			editingEls[el].el.style.marginBottom = h.editorBox.height*1/200+"px";
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
	h.login.el.onclick= openLoginWindow;
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
		resizeEditContentWrappers();
		computeMaxHolderWidth();
	}
}

function resizeRHtml(){
	if(h.rescalerR.left+D2.x<window.innerWidth-h.rescalerR.width-2&&h.rescalerR.left+D2.x>h.rescalerL.left+h.rescalerL.width+1){
		h.rescalerR.Left(h.rescalerR.left+D2.x);
		h.editorBox.Width(h.editorBox.width + D2.x);
		h.previewBox.Left(h.previewBox.left+D2.x);
		h.previewBox.Width(h.previewBox.width-D2.x);
		resizeInjectedElements();
		resizeEditContentWrappers();
		computeMaxHolderWidth();
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

function openLoginWindow(e){
	document.body.appendChild(darken);
	document.body.appendChild(whiteWrap);
}

function removeDarken(e){
	darken.parentNode.removeChild(darken);
	whiteWrap.parentNode.removeChild(whiteWrap);
}
