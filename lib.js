var isIE = document.all ? true : false;

//Get Mouse Position Whithin Layer(Canvas)
	function getMouse(e) {
		var x, y;
		if (e.layerX || e.layerY) {
			x = e.layerX;
			y = e.layerY;
		}
		else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}				
		return {x:x, y:y};
};

function getMouseWin(e) {
	var _x;
	var _y;
	if (!isIE) {
		_x = e.pageX;
		_y = e.pageY;
	}
	if (isIE) {
		_x = event.clientX + document.body.scrollLeft;
		_y = event.clientY + document.body.scrollTop;
	}
	return {x:_x,y:_y};
};

// Resize Canvas
	function resize_canvas(canvas, w, h){
		canvas.height = h;
		canvas.width = w;
};

// Position Elements
	function position_element(element, x, y){
		element.style.top = y + "px";
		element.style.left = x + "px";
};

// Get 2D Context For
	function context_for(canvas){
		return canvas.getContext("2d");
};

// Draw Rectangle
	function draw_rect(ctx, x, y, w, h, fill){
		ctx.fillStyle = fill;
		if(w=="auto")
			w=window.innerWidth;
		if(h=="auto")
			h=window.innerHeight;
		ctx.fillRect(x, y, w, h);
};

// Load all images from sources
	function load_images(sources, callback){
		var loadedImages = 0;
		var numImages = 0;
		for (var src in sources) {
			numImages++;
		}
		for (var src in sources) {
			images[src] = new Image();
			images[src].onload = function(){
				if (++loadedImages >= numImages) {
					callback(images);
				}
			};
			images[src].src = sources[src];
		}
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }