$(document).ready(function(){
	class Wheel {
		constructor(canvasContext) {
			this.ctx = canvasContext;
			this.segments = ["90 deg", "180 deg", "270 deg", "360 deg"];
			this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
			this.diameter = 250;
			this.centerX = 500;
			this.centerY = 300;
		}

		drawWheel() {
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
			};
		}

		drawSegment(angle1, angle2) {
			this.ctx.beginPath();
			this.ctx.arc(this.centerX, this.centerY, this.diameter, angle1, angle2);
			this.ctx.lineTo(this.centerX, this.centerY);
			this.ctx.fillStyle = this.colors[Math.floor(Math.random()*7)];
			this.ctx.fill();
			this.ctx.stroke();
		};
	}

	var cteex = $("#canvas")[0].getContext('2d');
	var wheel = new Wheel(cteex);
	wheel.drawWheel();
	wheel.drawSegments();



	// ctx.beginPath();
	// ctx.arc(500, 300, 250, 0, 2 * Math.PI);
	// ctx.stroke();

	// var start = 0;
	// var color = ["red", "blue", "green", "yellow"];

	// for (i = 0; i < 4; i++) {
	// 	var end  = (2 * Math.PI /4) * (i + 1);

	// 	ctx.beginPath();
	// 	ctx.arc(500, 300, 250, start, end)
	// 	ctx.lineTo(500, 300);
	// 	ctx.fillStyle = color[i];
	// 	ctx.fill();
	// 	ctx.stroke();

	// 	var start = end;

	// 	debugger;	
	// }
	
});
