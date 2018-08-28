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
			onclick: "wheel.spin()"
		})[0];
		container.innerHTML = null;
		container.append(canvas);
		return canvas;
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}