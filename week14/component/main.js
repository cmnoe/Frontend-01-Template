import { createElement } from "./createElement";

// class MyComponent {
// 	constructor() {
// 		this.children = [];
// 	}
// 	// set class(v) {
// 	//     console.log("Parent::class", v)
// 	// }

// 	// set id(v) {
// 	//     console.log("Parent::id", v)
// 	// }

// 	setAttribute(name, value) {
// 		this.root.setAttribute(name, value);
// 	}

// 	render() {
// 		return <header>{this.slot}</header>;
// 	}

// 	mountTo(parent) {
//         this.slot = <div></div>;
// 		for (let child of this.children) {
// 			this.slot.appendChild(child)
//         }
//         this.render().mountTo(parent);
// 	}

// 	appendChild(child) {
// 		this.children.push(child);
// 	}
// }

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
		root.addEventListener("mousedown", event => {
			let data = this.attributes.get("data")
			let startX = event.clientX,
				startY = event.clientY;
			let lastPosition = (position - 1 + data.length) % data.length;
			let nextPosition = (position + 1) % data.length;


			let current = root.children[position];
			let last = root.children[lastPosition];
			let next = root.children[nextPosition];

			current.style.transition = "ease 0s";
			last.style.transition = "ease 0s";
			next.style.transition = "ease 0s";

			current.style.transform = `translateX(${-500 * position}px)`
			last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`
			next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

			let move = event => {
				current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
				last.style.transform =
					`translateX(${event.clientX - startX - 500 -500 * lastPosition}px)`
				next.style.transform =
					`translateX(${event.clientX - startX + 500 -500 * nextPosition}px)`
			};
			let up = event => {
				let offset = 0;
				if (event.clientX - startX > 250) {
					offset = 1;
				} else if (event.clientX - startX < -250) {
					offset = -1;
				}

				// transition设为空表示打开transition
				current.style.transition = "";
				last.style.transition = "";
				next.style.transition = "";

				current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
				last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
				next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

				position = (position - offset + data.length) % data.length;

				document.removeEventListener("mousemove", move);
				document.removeEventListener("mouseup", up);
			}
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", up);
		})

		let position = 0;

		let nextPic = () => {
			let nextPosition = (position + 1) % this.attributes.get("data").length;
			let current = children[position];
			let next = children[nextPosition];
			current.style.transition = "ease 0s";
			next.style.transition = "ease 0s";
			current.style.transform = `translateX(${-100 * position}%)`;
			next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

			setTimeout(() => {
				// 去掉transtion属性，用css控制
				current.style.transition = "";
				next.style.transition = "";
				current.style.transform = `translateX(${-100 - 100 * position}%)`;
				next.style.transform = `translateX(${-100 * nextPosition}%)`;
				position = nextPosition;
			}, 16);

			setTimeout(nextPic, 3000);
		};
		// setTimeout(nextPic, 3000);

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

// let component = 'div'

component.mountTo(document.body);

// component.setAttribute("id", "a")
