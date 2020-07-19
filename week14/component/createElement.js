export function createElement(Cls, attributes, ...children) {
	let o;
	if (typeof Cls === "string") {
		o = new Wrapper(Cls);
	} else {
		o = new Cls();
	}
	for (let name in attributes) {
		o.setAttribute(name, attributes[name]);
	}
	let visit = (children) => {
		for (let child of children) {
			if (typeof child === "string") {
				child = new Text(child);
			}
			if (typeof child === "object" && child instanceof Array) {
				visit(child);
				continue;
			}
			o.appendChild(child);
		}
	}

	visit(children);
	
	console.log(o)
	return o;
}

class Wrapper {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value) {
		this.root.setAttribute(name, value);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
		for (let child of this.children) {
			child.mountTo(this.root);
		}
	}

	appendChild(child) {
		this.children.push(child);
	}

	addEventListener() {
		this.root.addEventListener(...arguments);
    }
    
    get style() {
        return this.root.style;
    }
}

class Text {
	constructor(text) {
		this.root = document.createTextNode(text);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
	}
}