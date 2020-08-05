import { createElement, Text, Wrapper } from "./createElement";

export class TabPanel {
	constructor() {
		this.children = [];
		this.attributes = new Map();
        this.properties = new Map();
	}

	setAttribute(name, value) {
		this.attributes.set(name, value);
    }

    getAttribute(name) {
		return this[name]
    }

    select(i) {
        for (let view of this.childViews) {
            view.style.display = 'none'
        }
        this.childViews[i].style.display = ""
        for (let view of this.titleViews) {
            view.classList.remove('selected')
        }
        this.titleViews[i].classList.add('selected')
        //this.titleView.innerText = this.children[i].title
    }

	render() {

        this.childViews = this.children.map(child => <div style="width: 300px;min-height: 300px;">{child}</div>)
        this.titleViews = this.children.map((child, i) => <span onClick={() => this.select(i)} 
            style="cursor: pointer;background-color: lightgreen;margin: 5px 5px 0 5px;width: 300px;min-height: 300px;font-size: 24px;">{child.getAttribute('title')}</span>)

        setTimeout(() => {
            this.select(0)
        }, 16);
        return <div class="tab-panel" style="width: 300px;">
            <h1 style="width: 300px;margin: 0;">{this.titleViews}</h1>
            <div style="border: solid 1px lightgreen;">
                {this.childViews}
            </div>
        </div>;
	}

	mountTo(parent) {
		this.render().mountTo(parent);
	}

	appendChild(child) {
		this.children.push(child);
	}
}