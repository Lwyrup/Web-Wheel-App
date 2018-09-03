// Globals
var wheel;
var mockFilters =
[
	["hot", "cold"],
	["appetizer", "main course", "dessert"]
];
var mockItems = 
[
	{
		name: "Pizza",
		filters: [mockFilters[1][1], mockFilters[0][0]]
	}, 
	{
		name: "Nachos",
		filters: [mockFilters[1][0], mockFilters[0][0]]
	}, 
	{
		name: "Salad",
		filters: [mockFilters[1][0], mockFilters[0][1]]
	},
	{
		name: "Pasta",
		filters: [mockFilters[1][1], mockFilters[0][0]]
	},
	{
		name: "Steak",
		filters: [mockFilters[1][1], mockFilters[0][0]]
	},
	{
		name: "Ice Cream",
		filters: [mockFilters[1][2], mockFilters[0][1]]
	}
];

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

customElements.define("wheel-app", WheelAppElement);



// Execution begins here
// var containers = [ALL_ITEMS_CONTAINER, FILTERS_CONTAINER];
// var ui = new WheelUI(mockItems, mockFilters, containers);