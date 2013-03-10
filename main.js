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
	login: "login",
	eTable: "eTable",
	editHolder: "editHolder",
	canvasHolder: "canvasHolder",
	eTitle: "eTitle",
	pTitle: "pTitle",
	pTable: "pTable",
	eHeader: "eHeader",
	eMedia: "eMedia",
	eQuestion: "eQuestion",
	eAnswers: "eAnswers",
	eText: "eText",
	eHeaderInput: "eHeaderInput",
	pCanvas: "pCanvas",
	q1: "q1",
	q2: "q2",
	eInsertAnswer: "eInsertAnswer",
	playWrapper	: "playWrapper",
	accountWrapper: "accountWrapper",
	aboutWrapper: "aboutWrapper"
};

var options = ["Play", "Add Question", "Account" , "About"];
var answers = [];
var answersEls = [];

var l =  new Array();
var Preview;

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
		var option = document.createElement("div");
		var txt = document.createTextNode(options[i]);
		option.appendChild(txt);
		option.style.top = ((i)*h.topBar.height*window.innerWidth/wW) + "px";
		option.style.width = (h.sideBar.width-2)+"px";
		option.style.height = h.topBar.height*window.innerWidth/wW +"px";
		option.style.fontSize = h.topBar.height/3+"px";
		option.className = "option";
		option.id = "O"+(i+1); 

		newSeparator.src = ".\\Images\\separator.png";
		newSeparator.style.top = ((i+1)*h.topBar.height*window.innerWidth/wW) + "px";
		newSeparator.style.width = (h.sideBar.width-2)+"px";
		newSeparator.style.height = (parseInt(h.sideBar.height/400,10))+ "px";
		newSeparator.className = "lineSeparator";

		h.sideBar.el.appendChild(newSeparator);
		h.sideBar.el.appendChild(option);
	}
	document.getElementById("O1").onclick = play;
	document.getElementById("O2").onclick = edit;
	document.getElementById("O3").onclick = account;
	document.getElementById("O4").onclick = about;
}

function play(e){
	h.playWrapper.el.style.display = "block";
	h.aboutWrapper.el.style.display = "none";
	h.accountWrapper.el.style.display = "none";
}

function edit(e){
	h.playWrapper.el.style.display = "none";
	h.aboutWrapper.el.style.display = "none";
	h.accountWrapper.el.style.display = "none";
}

function account(e){
	h.playWrapper.el.style.display = "none";
	h.aboutWrapper.el.style.display = "none";
	h.accountWrapper.el.style.display = "block";
}

function about(e){
	h.playWrapper.el.style.display = "none";
	h.aboutWrapper.el.style.display = "block";
	h.accountWrapper.el.style.display = "none";
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
	resEl(h.playWrapper, h.topBar.height-1, h.sideBar.width, window.innerHeight-h.topBar.height, window.innerWidth-h.sideBar.width);
	resEl(h.accountWrapper, h.topBar.height-1, h.sideBar.width, window.innerHeight-h.topBar.height, window.innerWidth-h.sideBar.width);
	resEl(h.aboutWrapper, h.topBar.height-1, h.sideBar.width, window.innerHeight-h.topBar.height, window.innerWidth-h.sideBar.width);

	h.logo.Font(h.topBar.height*2/3);
	h.centeredText.Font(h.topBar.height/3);
	h.centeredText2.Font(h.topBar.height/3);
	h.eTitle.Font(h.topBar.height*4/5);
	h.pTitle.Font(h.topBar.height*4/5);
	h.eHeader.Font(h.topBar.height*3/7);
	h.eMedia.Font(h.topBar.height*3/7);
	h.eQuestion.Font(h.topBar.height*3/7);
	h.eAnswers.Font(h.topBar.height*3/7);
	h.eHeaderInput.Font(h.topBar.height*2/3);
	h.eInsertAnswer.Font(h.topBar.height*2/3);
	resizeContents();
}

function resizeInjectedElements(){
	var seps = document.getElementsByClassName("lineSeparator");
	var ops = document.getElementsByClassName("option");
	for(var i=0; i<seps.length;i++){
		if(window.innerHeight>480){
			seps[i].style.top = ((i+1)*h.topBar.height) + "px";
		}
		if(window.innerWidth>640){
			seps[i].style.width = (parseInt(h.sideBar.width,10)-3)+"px";
		}
	}
	for(var i=0; i<ops.length;i++){
		if(window.innerHeight>480){
			ops[i].style.top = ((i)*h.topBar.height) + "px";
			ops[i].style.height = h.topBar.height +"px";
			ops[i].style.fontSize = h.topBar.height/3+"px";
		}
		if(window.innerWidth>640){
			ops[i].style.width = (h.sideBar.width-2)+"px";
		}
	}
}

function resizeContents(){
	resEl(h.editHolder, h.sideBar.height*1/20, 0, h.sideBar.height*9/10, h.editorBox.width*9/10);
	resEl(h.canvasHolder, h.sideBar.height*1/20, 0, h.sideBar.height*9/10, h.previewBox.width*9/10);
	resEl(h.eTable, 0, 2, 0, h.editHolder.width-2);
	resEl(h.pTable, 0, 2, 0, h.canvasHolder.width-2);
	resEl(h.eText, 0, 10, h.editHolder.height/10, h.editHolder.width-10);
	resEl(h.eHeaderInput, 0, 0, h.editHolder.height/20, h.editHolder.width-9);
	resEl(h.eInsertAnswer, 0, 0, h.editHolder.height/20, h.editHolder.width-9);
	resEl(h.q1, 0, 0, h.editHolder.height/10, h.editHolder.height/10);
	resEl(h.q2, 0, 0, h.editHolder.height/10, h.editHolder.height/10);
	resize_canvas(h.pCanvas, h.previewBox.width*9/10-10,  h.sideBar.height*9/10*11/12);
}

function resizeFonts(){
	h.logo.Font(h.logo.initFont*window.innerHeight/wH);
	h.centeredText.Font(h.centeredText.initFont*window.innerHeight/wH);
	h.centeredText2.Font(h.centeredText2.initFont*window.innerHeight/wH);
	resizeContentFonts();
	resizeFormFonts();
}

function resizeContentFonts(){
	h.eTitle.Font(h.eTitle.initFont*window.innerHeight/wH);
	h.pTitle.Font(h.pTitle.initFont*window.innerHeight/wH);
	h.eMedia.Font(h.eHeader.initFont*window.innerHeight/wH);
	h.eQuestion.Font(h.eHeader.initFont*window.innerHeight/wH);
	h.eAnswers.Font(h.eHeader.initFont*window.innerHeight/wH);
	h.eHeaderInput.Font(h.topBar.height*2/3);
	h.eInsertAnswer.Font(h.topBar.height*2/3);
	resizeEAnswers();
}

function resizeEAnswers(){

	for(var an in answersEls){
		answersEls[an].style.fontSize = h.topBar.height/3+"px";
	}
}

function resizeElements(){
	for(var el in h){
		if(el!="pCanvas"){
			if(window.innerWidth>640){
				h[el].Width(h[el].initWidth*window.innerWidth/wW);
				h[el].Left(h[el].initLeft*window.innerWidth/wW);
			}
			if(window.innerHeight>480){
				h[el].Height(h[el].initHeight*window.innerHeight/wH);
				h[el].Top(h[el].initTop*window.innerHeight/wH);
			}
		}
	}

	if(window.innerHeight>480){
		resizeFonts();
	}
	initcanvas();
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

function initcanvas(){
	Preview = new CanvasObj(h.pCanvas.el, 0, 0, h.canvasHolder.width-10,h.canvasHolder.height*11/12,"#00b");
	var header = new T(2, 2, h.topBar.height*3/7, h.eHeaderInput.el.value, "#ccc","left");
	var questionbody = new T(Preview.w/2, Preview.h/2, h.topBar.height*3/7, h.eText.el.value,"#777", "center");
	var im = new I(Preview.w/3, Preview.h/10, Preview.w/3, Preview.h/3, images["q1"]);
	Preview.add_shape(header);
	Preview.add_shape(questionbody);
	Preview.add_shape(im);
	Preview.draw();
}

function initHtml(){
	load_images(image_sources, function(images){});
	initElements();
	sizeElements();
	initSizeHtml();
	generateSeparators(4);
	initLoginEls();
	initcanvas();
}

function insertAnswer(s){
		var d = document.createElement("div");
		var la = document.createElement("label");
		var t = document.createTextNode(s);
		var c = document.createElement("input");
		var del = document.createElement("input");
		la.style.fontSize = h.topBar.height/3+"px";
		la.className="leftMargin";
		la.id= "A"+(answers.length+1);
		answersEls.push(la);
		del.className="delete";
		del.type="checkbox";
		c.className="tick";
		c.type="checkbox";
		la.appendChild(t);
		d.appendChild(la);
		d.appendChild(c);
		d.appendChild(del);
		h.editHolder.el.appendChild(d);
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
	h.eHeaderInput.el.onkeyup = updateCanvasHeader;
	h.eText.el.onkeyup = updateCanvasBody;
	h.eInsertAnswer.el.onkeyup = addAnswer;
}

function addAnswer(e){
	if(e.keyCode==13){
		if(answers.length<5){
			answers.push(h.eInsertAnswer.el.value);
			insertAnswer(h.eInsertAnswer.el.value);
		}else{
			alert("You can have a maximum of 5 answers per question")
		}
		h.eInsertAnswer.el.value="";
	}
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
		h.playWrapper.Width(h.playWrapper.width+D1.x);
		h.editorBox.Left(h.editorBox.left+D1.x);
		h.editorBox.Width(h.editorBox.width-D1.x);
		resizeInjectedElements();
		resizeContents();

	}
}

function resizeRHtml(){
	if(h.rescalerR.left+D2.x<window.innerWidth-h.rescalerR.width-2&&h.rescalerR.left+D2.x>h.rescalerL.left+h.rescalerL.width+1){
		h.rescalerR.Left(h.rescalerR.left+D2.x);
		h.editorBox.Width(h.editorBox.width + D2.x);
		h.previewBox.Left(h.previewBox.left+D2.x);
		h.previewBox.Width(h.previewBox.width-D2.x);
		resizeInjectedElements();
		resizeContents();
		initcanvas();
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

function updateCanvasHeader(e){
	Preview.objects[0].text = h.eHeaderInput.el.value;
	Preview.ctx.clearRect(0,0,Preview.w, Preview.h);
	Preview.draw();
}

function updateCanvasBody(e){
	Preview.objects[1].text = h.eText.el.value;
	Preview.ctx.clearRect(0,0,Preview.w, Preview.h);
	Preview.draw();
}