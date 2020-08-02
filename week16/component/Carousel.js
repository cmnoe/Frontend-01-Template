import { createElement, Text, Wrapper } from "./createElement";
import { Timeline, Animation } from "./animation";
import { ease } from './cubicBezier'

export class Carousel {
	constructor() {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
	}

	setAttribute(name, value) {
		this.attributes.set(name, value);
	}

	render() {
        let position = 0
		let timeline = new Timeline
        timeline.start()
        let nextPicStopHandler = null
		let data = this.attributes.get("data")
		let children = data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + data.length) % data.length
            let nextPosition = (currentPosition + 1) % data.length

            let offset = 0

            let onStart = _ => {
                timeline.pause()
                clearTimeout(nextPicStopHandler)

                let currentElement = children[currentPosition]
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]) 
                offset = currentTransformValue + 500 * currentPosition
            }
            let onPan = event => {
				let dx = event.detail.clientX - event.detail.startX

                let lastElement = children[lastPosition]
                let currentElement = children[currentPosition]
				let nextElement = children[nextPosition]
				
				let limitOffset = (offset + dx) < -500 ? -500 : (offset + dx) > 500 ? 500 : offset + dx

                let lastTransformValue = -500 - 500 * lastPosition + limitOffset
                let currentTransformValue = -500 * currentPosition + limitOffset
                let nextTransformValue = 500 - 500 * nextPosition + limitOffset

                lastElement.style.transform = `translateX(${lastTransformValue}px)`
                currentElement.style.transform = `translateX(${currentTransformValue}px)`
                nextElement.style.transform = `translateX(${nextTransformValue}px)`
			}
			let onPanend = event => {
				let direction = 0
				let dx = event.detail.clientX - event.detail.startX

				if (dx + offset > 250 || dx > 0 && event.detail.isFlick) {
					direction = 1
				} else if (dx + offset < -250 || dx < 0 && event.detail.isFlick) {
					direction = -1
				}
				timeline.reset()
				timeline.start()

				let lastElement = children[lastPosition]
                let currentElement = children[currentPosition]
                let nextElement = children[nextPosition]

				timeline.add(
					new Animation(
						lastElement.style,
						"transform",
						- 500 - 500 * lastPosition + offset + dx,
						- 500 - 500 * lastPosition + direction * 500,
						1000,
						0,
						ease,
						(v) => `translateX(${v}px)`
					)
				);
				timeline.add(
					new Animation(
						currentElement.style,
						"transform",
						-500 * currentPosition + offset + dx,
						-500 * currentPosition + direction * 500,
						1000,
						0,
						ease,
						(v) => `translateX(${v}px)`
					)
				);
				timeline.add(
					new Animation(
						nextElement.style,
						"transform",
						500 - 500 * nextPosition + offset + dx,
						500 - 500 * nextPosition + direction * 500,
						1000,
						0,
						ease,
						(v) => `translateX(${v}px)`
					)
				);

				position = (position - direction + data.length) % data.length

				nextPicStopHandler = setTimeout(nextPic, 3000)
			}
            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />;
            element.style.transform = "translateX(0px)"
			element.addEventListener("dragstart", (event) => event.preventDefault());
			return element;
		});
		let root = <div class='carousel'>{children}</div>;
		
		let nextPic = _ => {
			let nextPosition = (position + 1) % data.length;
			timeline.add(
				new Animation(
					children[position].style,
					"transform",
					- 100 * position,
					- 100 - 100 * position,
					1000,
					0,
					ease,
					(v) => `translateX(${5 * v}px)`
				)
			);
			timeline.add(
				new Animation(
					children[nextPosition].style,
					"transform",
					100 - 100 * nextPosition,
					-100 * nextPosition,
					1000,
					0,
					ease,
					(v) => `translateX(${5 * v}px)`
				)
			);
			position = nextPosition
			
			nextPicStopHandler = setTimeout(nextPic, 3000);
		};

		nextPicStopHandler = setTimeout(nextPic, 3000)

		return root;
	}

	mountTo(parent) {
		this.render().mountTo(parent);
	}

	appendChild(child) {
		this.children.push(child);
	}
}