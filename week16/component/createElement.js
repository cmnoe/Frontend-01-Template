import { enableGesture } from "./gesture";

export function createElement(Cls, attributes, ...children) {
	let o;
	// Cls为字符串时为一般dom元素，否则创建自定义的组件
	if (typeof Cls === "string") {
		o = new Wrapper(Cls);
	} else {
		o = new Cls();
	}
	// 设置dom元素的属性
	for (let name in attributes) {
		o.setAttribute(name, attributes[name]);
	}
	// 挂载子元素，子元素为字符串时创建文本结点，为数组时递归调用自身逐个挂载
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

	return o;
}

class Wrapper {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value) {
		this.root.setAttribute(name, value);

		if (name.match(/^on([\s\S]+)$/)) {
			let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLocaleLowerCase())
			this.addEventListener(eventName, value)
		}

		if (name === 'enableGesture') {
			enableGesture(this.root)
		}
	}

	getAttribute(name) {
		return this.root.getAttribute(name)
    }

	set innerText(text) {
		return this.root.innerText = text
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
	
	get classList() {
        return this.root.classList;
    }
}

class Text {
	constructor(text) {
		this.root = document.createTextNode(text);
	}

	mountTo(parent) {
		parent.appendChild(this.root);
	}

	getAttribute(name) {
		return
	}
}