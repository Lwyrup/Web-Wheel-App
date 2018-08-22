$(document).ready(function() {
	const ALL_ITEMS_CONTAINER = $(".all-items");
	const FILTERS_CONTAINER = $(".filters");
	var mockItems = ["Pizza", "Nachos", "Salad", "Pasta", "Steak", "Ice Cream"];
	var mockFilters = [
		["Hot", "Cold"],
		["Appetizer", "Main Course", "Dessert"]
	];

	var createUIListItem = function(item) {
		var li = $(document.createElement("li"));
		var label = createLabelElement(item, {for: item.toLowerCase()});
		var input = createInputElement({
			id: item.toLowerCase(),
			type: "checkbox",
			checked: true
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

	populateUIListFromArray(mockItems, ALL_ITEMS_CONTAINER);
	populateUIListFromArray(mockFilters, FILTERS_CONTAINER);
});