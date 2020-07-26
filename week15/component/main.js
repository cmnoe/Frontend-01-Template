import { createElement } from "./createElement";
import { Timeline, Animation } from "./animation";
import { cubicBezier } from "./cubicBezier.js";

class Carousel {
	constructor() {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
	}

	setAttribute(name, value) {
		this.attributes.set(name, value);
	}

	render() {
		let children = this.attributes.get("data").map((url) => {
			let element = <img src={url} />;
			element.addEventListener("dragstart", (event) => event.preventDefault());
			return element;
		});
		let root = <div class='carousel'>{children}</div>;

		let position = 0;
		let newPosition = 0;

		let nextPic = _ => {
			let tl = new Timeline();
			let ease = cubicBezier(0.25, 0.1, 0.25, 1);
			position = newPosition;
			newPosition = (position + 1) % this.attributes.get("data").length;
			tl.add(
				new Animation(
					children[position].style,
					"transform",
					0,
					100,
					1000,
					0,
					ease,
					(v) => `translateX(${-100 * position - v}%)`
				)
			);
			tl.add(
				new Animation(
					children[newPosition].style,
					"transform",
					0,
					100,
					1000,
					0,
					ease,
					(v) => `translateX(${100 - 100 * newPosition - v}%)`
				)
			);
			tl.start();
			setTimeout(nextPic, 3000);
		};

		setTimeout(nextPic, 3000)

		return root;
	}

	mountTo(parent) {
		this.render().mountTo(parent);
	}

	appendChild(child) {
		this.children.push(child);
	}
}

let data = [
	"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
	"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
	"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
	"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let component = <Carousel data={data} />;

component.mountTo(document.body);
