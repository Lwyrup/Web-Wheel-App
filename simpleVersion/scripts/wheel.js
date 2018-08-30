class Wheel {
	constructor(wheelSize, segmentArray, wheelContainer) {
		this.segments = segmentArray;
		this.colors = ["red", "blue", "green", "yellow", "pink", "orange", "violet"];
		this.diameter = wheelSize;
		this.circleCenter = {x: wheelSize + 50, y: wheelSize + 50};
		this.canvasOffset = {x: 0, y: 0};
		this.rotation = 0;
		this.canvas = new Canvas(wheelContainer, this.circleCenter.x);
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
		this.rotation = deltaAngle % (2 * Math.PI);
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
		this.canvas.circle(this.centerX, this.centerY, this.diameter);
		this.drawSegments();
	}

	drawSegments() {
		var angle1 = 0, angle2 = 0, self = this;
		$.each(this.segments, function(i, segment) {
			angle1 += 2 * Math.PI / self.segments.length;
			self.drawSegment(angle2, angle1, i);
			angle2 = angle1;
		});
	}

	drawSegment(angle1, angle2, i) {
		this.canvas.circle(this.centerX, this.centerY, this.diameter, angle1, angle2);
		this.canvas.fillWith(this.colors[i]);
		this.drawText((angle1 + angle2)/2, this.segments[i]);
	}

	drawText(angle, text) {
		this.canvas.rotate(this.centerX, this.centerY, angle);
		this.canvas.writeText(text, 240, 15);
		this.canvas.restore();
	}

	drawNeedle() {
		var tip = this.centerX + (this.diameter - 40);
		this.canvas.triangle(tip, this.centerY, 70, 40);
	}

	spin() {
		var self = this;
		var initSpeed = 0.2 + 0.1 * Math.random();
		var acceleration = 0.001;
		var spinInterval = setInterval( function() {
			if (initSpeed > 0) {
				self.canvas.clear();
				self.canvas.rotate(self.centerX, self.centerY, -self.currentRotation);
				self.currentRotation += initSpeed;
				initSpeed -= acceleration;
				self.canvasOffset = self.circleCenter;
				self.drawWheel();
				self.canvasOffset = {x: 0, y: 0};
				self.canvas.restore();
				self.drawNeedle();	
				self.determineResult();
			} else if (initSpeed <= 0) {
				clearInterval(spinInterval);
			}
		}, 20);
	}

	determineResult() {
		var radsPSeg = 2 * Math.PI / this.segments.length;
		var pickedIndex = Math.floor(this.currentRotation / radsPSeg);
		var pickedSeg = this.segments[pickedIndex];
		this.displayResult(pickedSeg);
	}

	displayResult(text) {
		this.canvas.writeText(text, this.centerX * 2, this.centerY + 15, "start");
	}
}