// TODO: When update is called by un/selecting an item,
//       find filters that aren't fully un/selected and
//		 set the input node to indeterminate.

class WheelUI {
	constructor(items, filters, containers) {
		this.items = items;
		this.filters = filters;
		this.itemsContainer = containers[0];
		this.filterContainer = containers[1];
		this.init();
	}

	// Setters/Getters
	get itemNames() {
		var array = [];
		$.each(this.items, function(i, item) {
			array.push(item["name"]);
		});
		return array;
	}

	get checkedItems() {
		var array = [];
		$.each(this.items, function(i, item) {
			if (item["node"].checked) {
				array.push(item["name"]);
			}
		});
		return array;
	}

	// Functions
	init() {
		this.populateUIListFromArray(this.items, this.itemsContainer, "wheelApp.update()");
		this.populateUIListFromArray(this.filters, this.filterContainer, "wheelApp.update(this)");
		this.update();
	}

	populateUIListFromArray(array, container, onchangeFunc) {
		var self = this;
		$.each(array, function(i, arrayEle) {
			if (!Array.isArray(arrayEle)) {
				$(container).append(self.createUIListItem(arrayEle, onchangeFunc));
			} else {
				$(container).append($(document.createElement("hr")));
				self.populateUIListFromArray(arrayEle, container, onchangeFunc);
			}
		});
	}

	createUIListItem(item, onchangeFunc) {
		var li = $(document.createElement("li"));
		var label = this.createLabelElement(item["name"], {for: item["name"].toLowerCase()});
		var input = this.createInputElement({
			id: item["name"].toLowerCase(),
			type: "checkbox",
			checked: true,
			onchange: onchangeFunc
		});
		item["node"] = input[0];
		return li.append(input).append(label);
	}

	createLabelElement(labelText, labelAttributes = {}) {
		return $(document.createElement("label"))
			.attr(labelAttributes)
			.text(labelText);
	}

	createInputElement(inputAttributes = {}) {
		return $(document.createElement("input")).attr(inputAttributes);
	}

	update(filterInput = null) {
		if (filterInput) {
			this.setByFilter(filterInput.id, filterInput.checked);
		}
	}

	updateByFilter(filterInput) {
		this.setByFilter(filterInput.id, filterInput.checked);	
	}

	setByFilter(filter, bool) {
		$.each(this.items, function(i, item) {
			if (item.filters.includes(filter.toLowerCase())) {
				item.node.checked = bool;
			}
		});
	}




	itemsByFilter(filter) {
		var array = [];
		$.each(this.items, function(i, item) {
			if (item["filters"].includes(filter.toLowerCase())) {
				array.push(item);
			}
		});

		var allSame = array.every( (val, i, array) => val["node"].checked === array[0]["node"].checked );
		debugger;
	}
}