const ALL_ITEMS_CONTAINER = $(".all-items");
const FILTERS_CONTAINER = $(".filters");

var mockFilters =
[
	["Hot", "Cold"],
	["Appetizer", "Main Course", "Dessert"]
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



// var mockItems = ["Pizza", "Nachos", "Salad", "Pasta", "Steak", "Ice Cream"];
// var mockFilters = [
// 	["Hot", "Cold"],
// 	["Appetizer", "Main Course", "Dessert"]
// ];

var createUIListItem = function(item) {
	var li = $(document.createElement("li"));
	debugger;
	var label = createLabelElement(item, {for: item.toLowerCase()});
	var input = createInputElement({
		id: item.toLowerCase(),
		type: "checkbox",
		checked: true,
		onchange: "update()"
	});
	return li.append(input).append(label);
};

var createLabelElement = function(labelText, labelAttributes = {}) {
	return $(document.createElement("label"))
		.attr(labelAttributes)
		.text(labelText);
};

var createInputElement = function(inputAttributes = {}) {
	return $(document.createElement("input")).attr(inputAttributes);
};

var populateUIListFromArray = function(array, container) {
	$.each(array, function(key, item) {
		if (!Array.isArray(item)) {
			container.append(createUIListItem(item));
		}
		else {
			container.append($(document.createElement("hr")));
			populateUIListFromArray(item, container);
		};
	});
};


var items = [];

for (var i = 0; i < mockItems.length; i++) { 
	items.push(mockItems[i]["name"]) 
};

populateUIListFromArray(items, ALL_ITEMS_CONTAINER);
populateUIListFromArray(mockFilters, FILTERS_CONTAINER);



