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

// Define our custom element
customElements.define("wheel-app", WheelAppElement);

// Execution begins here
// var containers = [ALL_ITEMS_CONTAINER, FILTERS_CONTAINER];
// var ui = new WheelUI(mockItems, mockFilters, containers);