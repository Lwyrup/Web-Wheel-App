class WheelAppElement extends HTMLElement {
	constructor() {
		super();

		var shadow = this.attachShadow({mode: "open"}),
			controls = document.createElement("div"),
			itemsContainer = document.createElement("ul"),
			filterContainer = document.createElement("ul"),
			wheelContainer = document.createElement("div"),
			link = document.createElement("link");
		
		controls.setAttribute("class", "controls");
		itemsContainer.setAttribute("class", "all-items");
		filterContainer.setAttribute("class", "filters");
		wheelContainer.setAttribute("class", "wheel-container");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", "styles.css");

		shadow.appendChild(controls);
		shadow.appendChild(wheelContainer);
		shadow.appendChild(link);
		controls.appendChild(itemsContainer);
		controls.appendChild(filterContainer);
		
		wheelApp = new WheelApp([itemsContainer, filterContainer, wheelContainer]);
	}
}