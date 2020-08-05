import { createElement, Text, Wrapper } from "./createElement";

export class ListView {
	constructor() {
		this.children = [];
		this.attributes = new Map();
        this.properties = new Map();
	}

	setAttribute(name, value) {
		this.attributes.set(name, value);
    }

    getAttribute(name) {           
		return this.attributes.get(name)
    }

	render() {
        let data = this.getAttribute('data')
        return <div class="list-view" style="width: 300px;">
            {
                data.map(this.children[0])
            }
        </div>;
	}

	mountTo(parent) {
		this.render().mountTo(parent);
	}

	appendChild(child) {
		this.children.push(child);
	}
}