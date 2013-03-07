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