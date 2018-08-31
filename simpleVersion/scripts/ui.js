class WheelUI {
	constructor(items, filters, containers) {
		this.items = items;
		this.filters = filters;
		this.itemsContainer = containers[0];
		this.filterContainer = containers[1];
		this.wheelContainer = containers[2];
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
		this.populateUIListFromArray(this.itemNames, this.itemsContainer, "WheelApp.ui.update()");
		this.populateUIListFromArray(this.filters, this.filterContainer, "WheelApp.ui.update(this)");
		this.linkNodesToItems();
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
		var label = this.createLabelElement(item, {for: item.toLowerCase()});
		var input = this.createInputElement({
			id: item.toLowerCase(),
			type: "checkbox",
			checked: true,
			onchange: onchangeFunc
		});
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

	linkNodesToItems() {
		var itemInputs = $(this.itemsContainer).find("input"), self = this;
		$.each(itemInputs, function(i, itemInput) {
			self.items[i]["node"] = itemInput;
		});
	}

	update(filterInput = null) {
		if (filterInput) {
			this.setByFilter(filterInput.id, filterInput.checked);
		}
		wheel = new Wheel(250, this.checkedItems, this.wheelContainer);
	}

	setByFilter(filter, bool) {
		$.each(this.items, function(i, item) {
			if (item["filters"].includes(filter.toLowerCase())) {
				item["node"].checked = bool;
			}
		});
	}
}