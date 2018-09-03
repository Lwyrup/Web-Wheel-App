class WheelApp {
	constructor(containers) {
		this.containers = containers;
		this.appData = [mockItems, mockFilters]
		this.ui = new WheelUI(this.appData[0], this.appData[1], this.containers);
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