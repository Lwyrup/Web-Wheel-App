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
		$.each(this.items, function(key, item) {
			array.push(item["name"]);
		});
		return array;
	}

	get checkedItems() {
		var array = [];
		$.each(this.items, function(key, item) {
			if (item["node"].checked) {
				array.push(item["name"]);
			}
		});
		return array;
	}

	// Functions
	init() {
		this.populateUIListFromArray(this.itemNames, this.itemsContainer, "ui.update()");
		this.linkNodesToItems();
		this.populateUIListFromArray(this.filters, this.filterContainer, "ui.update(this)");
		this.update();
	}

	linkNodesToItems() {
		var itemInputs = this.itemsContainer.find("input")
		for (var i = 0; i < itemInputs.length; i++) {
			this.items[i]["node"] = itemInputs[i];
		}
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

	populateUIListFromArray(array, container, onchangeFunc) {
		for (var i = 0; i < array.length; i++) {
			if (!Array.isArray(array[i])) {
				container.append(this.createUIListItem(array[i], onchangeFunc));
			}
			else {
				container.append($(document.createElement("hr")));
				this.populateUIListFromArray(array[i], container, onchangeFunc);
			};
		};
	}

	setByFilter(filter, bool) {
		$.each(this.items, function(key, item) {
			if (item["filters"].includes(filter.toLowerCase())) {
				item["node"].checked = bool;
			}
		});
	}

	update(filterInput = null) {
		if (filterInput) {
			this.setByFilter(filterInput.id, filterInput.checked);
		}
		wheel = new Wheel(250, this.checkedItems, $("#wheelContainer")[0]);
	}
}