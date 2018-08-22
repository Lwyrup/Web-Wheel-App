var spinInterval;
$(document).ready(function(){
	class Wheel {
		constructor(wheelSize, wheelContainer) {
			this.segments = ["90 deg", "180 deg", "270 deg", "360 deg"];
			this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
			this.diameter = wheelSize;
			this.circleCenter = {x: wheelSize + 50, y: wheelSize + 50};
			this.canvasOffset = {x: 0, y: 0};
			this.rotation = 0;
			this.canvas = new Canvas(wheelContainer, this.circleCenter.x);
			this.ctx = this.canvas.context;
			this.init();
		}

		// Getters
		get centerX() {
			return this.circleCenter.x - this.canvasOffset.x;
		}

		get centerY() {
			return this.circleCenter.y - this.canvasOffset.y;
		}

		// Functions
		init() {
			this.drawWheel();
			this.drawSegments();
			this.drawNeedle();
			this.spin(this);
		}

		drawWheel() {
			this.drawCircle(this.centerX, this.centerY, this.diameter);
		}

		drawCircle(x, y, d) {
			this.ctx.beginPath();
			this.ctx.arc(x, y, d, 0 , 2 * Math.PI);
			this.ctx.stroke();
		}

		drawSegments() {
			var endAngle, startAngle = 0;
			for (var i = 0; i < this.segments.length; i++) {
				endAngle = (2 * Math.PI / this.segments.length) * (i + 1);
				this.drawSegment(startAngle, endAngle, i);
				startAngle = endAngle;
			}
		}

		drawSegment(angle1, angle2, i) {
			this.ctx.beginPath();
			this.ctx.arc(this.centerX, this.centerY, this.diameter, angle1, angle2);
			this.ctx.lineTo(this.centerX, this.centerY);
			this.ctx.closePath();
			this.ctx.fillStyle = this.colors[i];
			this.ctx.fill();
			this.ctx.stroke();
		}

		drawNeedle() {
			var tip = this.centerX + (this.diameter - 40);
			this.ctx.beginPath();
			this.ctx.moveTo(tip, this.centerY);
			this.ctx.lineTo(tip + 70, this.centerY + 20);
			this.ctx.lineTo(tip + 70, this.centerY - 20);
			this.ctx.fillStyle = "#ffffff";
			this.ctx.fill();
			this.ctx.stroke();
		}

		spin(wheel) {
			spinInterval = setInterval( function() {
				console.log(wheel.diameter)
				// Move upper left canvas corner to circles center
				wheel.ctx.save();
				wheel.ctx.translate(wheel.centerX, wheel.centerY);
				wheel.ctx.rotate(wheel.rotation);
				wheel.rotation += 0.1;
				// Offsets the circle so the center is 0,0
				wheel.canvasOffset = wheel.circleCenter;
				// Redraw everything
				wheel.drawWheel();
				wheel.drawSegments();
				wheel.ctx.restore();
				// Remove offset
				wheel.canvasOffset = {x: 0, y: 0};
				wheel.drawNeedle();
			}, 20);
		}
	}

	class Canvas {
		constructor(container, size) {
			this.canvas = this.createCanvas(container, size);
			this.context = this.canvas.getContext("2d");
		}

		createCanvas(container, size){
			var canvas = $(document.createElement("canvas")).attr({
				style: "border:1px solid #000000;",
				height: size * 2,
				width: size * 2 + 400,
				id: "canvas"
			})[0];
			container.append(canvas);
			return canvas;
		}

		clear() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}


	var container = $("#wheelContainer")[0];
	var wheel = new Wheel(250, container);
});

