$(document).ready(function(){
	class Wheel {
		constructor(canvasContext) {
			this.ctx = canvasContext;
			this.segments = ["90 deg", "180 deg", "270 deg", "360 deg"];
			this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
			this.diameter = 250;
			this.centerX = 500;
			this.centerY = 300;
			this.rotation = 0;
		}

		drawWheel(offset = 0) {
			this.ctx.beginPath();
			this.ctx.arc(this.centerX, this.centerY, this.diameter, 0 , 2 * Math.PI);
			this.ctx.stroke();
		}

		drawSegments() {
			var startAngle = 0;
			var numOfSeg = this.segments.length;
			for (var i = 0; i < numOfSeg; i++) {
				var endAngle = (2 * Math.PI / numOfSeg) * (i + 1);
				this.drawSegment(startAngle, endAngle);
				startAngle = endAngle;
			}
		}

		drawSegment(angle1, angle2) {
			this.ctx.beginPath();
			this.ctx.arc(this.centerX, this.centerY, this.diameter, angle1, angle2);
			this.ctx.lineTo(this.centerX, this.centerY);
			this.ctx.closePath();
			this.ctx.fillStyle = this.colors[Math.floor(Math.random()*7)];
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

				wheel.ctx.save();
				wheel.ctx.translate(500, 300);
				wheel.ctx.rotate(wheel.rotation);
				wheel.rotation += 0.1;

				wheel.ctx.beginPath();
				wheel.ctx.arc(0, 0, 250, 0 , 2 * Math.PI);
				wheel.ctx.stroke();

				var start = 0;

				for (var i = 0; i < 4; i++) {
					var end = (2 * Math.PI / 4) * (i + 1);
					wheel.ctx.beginPath();
					wheel.ctx.arc(0, 0, 250, start, end)
					wheel.ctx.lineTo(0, 0);
					wheel.ctx.closePath();
					wheel.ctx.fillStyle = "yellow";
					wheel.ctx.fill();
					wheel.ctx.stroke();
					start = end;
				}
				wheel.ctx.restore();
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