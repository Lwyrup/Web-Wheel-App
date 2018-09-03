class WheelAppElement extends HTMLElement {
	constructor() {
		super();

		var shadow = this.attachShadow({mode: "open"}),
			controls = document.createElement("div"),
			itemsContainer = document.createElement("ul"),
			filterContainer = document.createElement("ul"),
			wheelContainer = document.createElement("div"),
			css = document.createElement("style");
		
		controls.setAttribute("class", "controls");
		itemsContainer.setAttribute("class", "all-items");
		filterContainer.setAttribute("class", "filters");
		wheelContainer.setAttribute("class", "wheelContainer");
		// css styles for custom element defined here
		css.textContent = "";

		shadow.appendChild(controls);
		shadow.appendChild(wheelContainer);
		controls.appendChild(itemsContainer);
		controls.appendChild(filterContainer);
		
		WheelAppElement.containers = [itemsContainer, filterContainer, wheelContainer];
		WheelAppElement.ui = new WheelUI(mockItems, mockFilters, WheelAppElement.containers);
	}
}