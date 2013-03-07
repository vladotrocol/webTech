function htmlEl(id){
	this.id = id;
	this.el = null;
	this.top = 0;
	this.left = 0;
	this.right = 0;
	this.height = 0;
	this.width = 0;
	this.color = "#fff";
	this.initHeight = 0;
	this.initWidth = 0;
	this.initTop = 0;
	this.initLeft = 0;
};

htmlEl.prototype.init = function(){
	this.el = document.getElementById(this.id);
};

htmlEl.prototype.initSize = function(){
	this.initHeight = this.height;
	this.initWidth = this.width;
	this.initTop = this.top;
	this.initLeft = this.left;
};

htmlEl.prototype.Top = function(t){
	this.top = t;
	this.el.style.top = t + "px";
};

htmlEl.prototype.Left = function(l){
	this.left = l;
	this.el.style.left = l + "px";
};
htmlEl.prototype.Right = function(r){
	this.right = r;
	this.el.style.right = r + "px";
};

htmlEl.prototype.Height = function(h){
	this.height = h;
	this.el.style.height = h + "px";
};

htmlEl.prototype.Width = function(w){
	this.width = w;
	this.el.style.width = w + "px";
};

htmlEl.prototype.Color = function(c){
	this.color = c;
	this.el.style.background = c;
}