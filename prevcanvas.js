var images = {};

image_sources={
				q1: "q1.jpg",
				q2: "q2.png"
};

// The standard canvas object
	function CanvasObj(canvas, x, y, w, h, fill){
		this.x = x||0;
		this.y = y||0;
		this.w = w||0;
		this.h = h||0;
		this.objects = [];
		this.ctx =  context_for(canvas);
		this.init(canvas, fill);
	};

// Initial set-up of the canvas
	CanvasObj.prototype.init = function(canvas, fill){
		position_element(canvas, this.x, this.y);
		resize_canvas(canvas, this.w, this.h);
	};

// Insert a shape into canvas
	CanvasObj.prototype.add_shape = function(shape) {
		this.objects.push(shape);
	};

// Draw all objects on canvas
	CanvasObj.prototype.draw = function(){
		for(var i=0; i<this.objects.length;i++){
			this.objects[i].draw(this.ctx);
		}
	};

// Image shape
	// Constructor
		function I(x, y, w, h, img){
			this.x = x||0;
			this.y = y||0;
			this.w = w||0;
			this.h = h||0;
			this.img = img||null;
			this.type = "image";
		};
	// Draw image
	I.prototype.draw = function(ctx){
		ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	};

// Text shape
	// Constructor
		function T(x, y, size, text, c, align){
			this.x = x||0;
			this.y = y||0;
			this.size = size||0;
			this.text = text||"";
			this.type = "text";
			this.align= align;
			this.color = c;
		};

	// Draw text
		T.prototype.draw=function(ctx){
		ctx.fillStyle    = this.color;
		ctx.font         = "italic "+ this.size +"px sans-serif";
		ctx.textBaseline = 'top';
		ctx.textAlign =  this.align;
		wrapText(ctx, this.text, this.x, this.y, h.pCanvas.width*9/10, 25);
	}

