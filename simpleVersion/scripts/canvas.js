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
			id: "canvas",
			onclick: "wheelApp.spin()"
		})[0];
		container.innerHTML = null;
		container.append(canvas);
		return canvas;
	}

	circle(x, y, d, angle1 = 0, angle2 = 2 * Math.PI) {
		this.context.beginPath();
		this.context.arc(x, y, d, angle1, angle2);
		this.context.lineTo(x, y);
		this.context.closePath();
		this.context.stroke();
	}

	triangle(tip, center, sizeX, sizeY) {
		this.context.beginPath();
		this.context.moveTo(tip, center);
		this.context.lineTo(tip + sizeX, center + sizeY / 2);
		this.context.lineTo(tip + sizeX, center - sizeY / 2);
		this.fillWith("#ffffff")
		this.context.stroke();
	}

	fillWith(color) {
		this.context.fillStyle = color;
		this.context.fill();
	}

	writeText(text, x, y, align = "end") {
		this.context.font = "30px Arial";
		this.context.textAlign = align;
		this.context.fillStyle = "#000000"
		this.context.fillText(text, x, y);
	}

	rotate(x, y, angle) {
		this.context.save();
		this.context.translate(x, y);
		this.context.rotate(angle);
	}

	restore() {
		this.context.restore();
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}