$(document).ready(function(){
	const ALL_ITEMS_CONTAINER = $(".all-items");
	const FILTERS_CONTAINER = $(".filters");
	var mockItems = ["Pizza", "Nachos", "Salad", "Pasta", "Steak", "Ice Cream"];
	var mockFilters = [
		["Hot", "Cold"],
		["Appetizer", "Main Course", "Dessert"]
	];

	var createUIListItem = function(){
		var li = $(document.createElement("li"));
		var input = $(document.createElement("input"));
		var label = $(document.createElement("label"));

		return li.append(input).append(label);
	};

	var populateUIListFromArray = function(array){
		$.each(array, function(key, item){
			ALL_ITEMS_CONTAINER.append(createUIListItem())
		});
	};

	populateUIListFromArray(mockItems);
});