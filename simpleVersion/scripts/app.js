class WheelApp {
	constructor(containers) {
		this.containers = containers;
		this.ui = new WheelUI(mockItems, mockFilters, containers);
		this.wheel = new Wheel(250, this.ui.checkedItems, this.containers[2]);
	}

	update(filter = null) {
		this.ui.update(filter);
		this.wheel = new Wheel(250, this.ui.checkedItems, this.containers[2])
	}

	spin() {
		this.wheel.spin();
	}
}