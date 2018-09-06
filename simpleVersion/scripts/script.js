// Globals
var wheelApp;
var mockFilters =
[
	[
		{
			name: "hot"
		}, 
		{
			name: "cold"
		}
	],
	[
		{
			name: "appetizer"
		}, 
		{
			name: "main course"
		}, 
		{
			name: "dessert"
		}
	]
];
var mockItems = 
[
	{
		name: "Pizza",
		filters: [mockFilters[1][1]["name"], mockFilters[0][0]["name"]]
	}, 
	{
		name: "Nachos",
		filters: [mockFilters[1][0]["name"], mockFilters[0][0]["name"]]
	}, 
	{
		name: "Salad",
		filters: [mockFilters[1][0]["name"], mockFilters[0][1]["name"]]
	},
	{
		name: "Pasta",
		filters: [mockFilters[1][1]["name"], mockFilters[0][0]["name"]]
	},
	{
		name: "Steak",
		filters: [mockFilters[1][1]["name"], mockFilters[0][0]["name"]]
	},
	{
		name: "Ice Cream",
		filters: [mockFilters[1][2]["name"], mockFilters[0][1]["name"]]
	}
];

// Define custom elements
customElements.define("wheel-app", WheelAppElement);