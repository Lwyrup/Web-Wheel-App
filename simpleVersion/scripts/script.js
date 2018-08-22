$(document).ready(function(){
	const ALL_ITEMS_CONTAINER = $(".all-items");
	const FILTERS_CONTAINER = $(".filters");
	var mockItems = ["Pizza", "Nachos", "Salad", "Pasta", "Steak", "Ice Cream"];
	var mockFilters = [
		["Hot", "Cold"],
		["Appetizer", "Main Course", "Dessert"]
	];

	var createUIListItem = function(item){
		var li = $(document.createElement("li"));
		var label = createLabelElement(item, {for: "item-" + item.toLowerCase()});
		var input = createInputElement({
			id: "item-" + item.toLowerCase(),
			type: "checkbox",
			checked: true
		});
		return li.append(input).append(label);
	};

	var createLabelElement = function(labelText, labelAttributes = {}){
		return $(document.createElement("label"))
			.attr(labelAttributes)
			.text(labelText);
	};

	var createInputElement = function(inputAttributes = {}){
		return $(document.createElement("input")).attr(inputAttributes);
	};

	var populateUIListFromArray = function(array){
		$.each(array, function(key, item){
			ALL_ITEMS_CONTAINER.append(createUIListItem(item))
		});
	};

	populateUIListFromArray(mockItems);
});