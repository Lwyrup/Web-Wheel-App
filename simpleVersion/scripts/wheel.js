$(document).ready(function(){
	class Wheel {
		constructor(canvasContext) {
			this.ctx = canvasContext;
			this.segments = ["90 deg", "180 deg", "270 deg", "360 deg"];
			this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
			this.diameter = 250;
			this.circleCenter = {x: 500, y: 300};
			this.canvasOffset = {x: 0, y: 0};
			this.rotation = 0;
		}

		// Getters
		get centerX() {
			return this.circleCenter.x - this.canvasOffset.x;
		}

		get centerY() {
			return this.circleCenter.y - this.canvasOffset.y;
		}

		// Functions
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

		spin() {
			var spinInterval = setInterval( function() {
				// Offsets the circle so the center is 0,0
				wheel.canvasOffset = wheel.circleCenter;
				// Move upper left canvas corner to circles center
				wheel.ctx.save();
				wheel.ctx.translate(500, 300);
				wheel.ctx.rotate(wheel.rotation);
				wheel.rotation += 0.1;
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

	var ctx = $("#canvas")[0].getContext('2d');
	var wheel = new Wheel(ctx);

	wheel.drawWheel();
	wheel.drawSegments();
	wheel.drawNeedle();
	wheel.spin();
	
});