// TODO: Refactor/move drawing implementation into canvas class?

class Wheel {
	constructor(wheelSize, segmentArray, wheelContainer) {
		this.segments = segmentArray;
		this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
		this.diameter = wheelSize;
		this.circleCenter = {x: wheelSize + 50, y: wheelSize + 50};
		this.canvasOffset = {x: 0, y: 0};
		this.rotation = 0;
		this.canvas = new Canvas(wheelContainer, this.circleCenter.x);
		this.ctx = this.canvas.context;
		this.init();
	}

	// Setters/Getters
	get centerX() {
		return this.circleCenter.x - this.canvasOffset.x;
	}

	get centerY() {
		return this.circleCenter.y - this.canvasOffset.y;
	}

	set currentRotation(deltaAngle) {
		if (deltaAngle > 2 * Math.PI) {
			deltaAngle -= 2 * Math.PI;
		}
		this.rotation = deltaAngle;
	}

	get currentRotation() {
		return this.rotation;
	}

	// Functions
	init() {
		this.drawWheel();
		this.drawNeedle();
	}

	drawWheel() {
		this.canvas.clear();
		this.drawCircle(this.centerX, this.centerY, this.diameter);
		this.drawSegments();
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
		this.drawText((angle1 + angle2)/2, this.segments[i]);
	}

	drawText(angle, text) {
		this.ctx.save();
		this.ctx.translate(this.centerX, this.centerY);
		this.ctx.rotate(angle);

		this.ctx.font = "30px Arial";
		this.ctx.textAlign = "right";
		this.ctx.fillStyle = "#000000"
		this.ctx.fillText(text, 240, 15);

		this.ctx.restore();
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

	spin(wheel = this) {
		var initSpeed = 0.2 + 0.1 * Math.random();
		var acceleration = 0.001;
		var spinInterval = setInterval( function() {
			if (initSpeed > 0) {
				wheel.canvas.clear();
				wheel.ctx.save();
				wheel.ctx.translate(wheel.centerX, wheel.centerY);
				wheel.ctx.rotate(-wheel.currentRotation);
				wheel.currentRotation += initSpeed;
				initSpeed -= acceleration;
				wheel.canvasOffset = wheel.circleCenter;
				wheel.drawWheel();
				wheel.canvasOffset = {x: 0, y: 0};
				wheel.ctx.restore();
				wheel.drawNeedle();	
				wheel.determineResult();
			} else if (initSpeed <= 0) {
				clearInterval(spinInterval);
			}
		}, 20);
	}

	determineResult(wheel = this) {
		// Correct only when spinning anti-clockwise
		var radsPSeg = 2 * Math.PI / wheel.segments.length;
		var pickedIndex = Math.floor(wheel.currentRotation / radsPSeg);
		var pickedSeg = wheel.segments[pickedIndex];
		wheel.displayResult(wheel, pickedSeg);
	}

	displayResult(wheel = this, text) {
		wheel.ctx.font = "30px Arial";
		wheel.ctx.fillStyle = "#000000";
		wheel.ctx.fillText(text, wheel.centerX * 2, wheel.centerY + 15);
	}
}