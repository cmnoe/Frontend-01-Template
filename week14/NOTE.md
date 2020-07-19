# 每周总结可以写在这里

## JSX 语法组件

- 在 webpack 配置中引入‘@babel/plugin-transform-react-jsx’插件解析 jsx 语法，设置‘pragma’参数为创建 dom 元素的函数名 createElement（名称可随意设置）

```
module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {pragma: "createElement"}]]
                    }
                }
            }
        ]
    }
```

- createElement 函数中接收三个参数 Cls（创建的元素名称，根据 react 的默认规则，首字母大写的为自定义组件的构造函数，首字母小写的为字符串，用 Wrapper 类接收创建普通 dom 元素）、attributes（属性值对象）、children（子元素数组）

```
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
```

- 自定义组件类

```
class Carousel {
    // 初始化
	constructor() {
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
	}

    // 设置属性
	setAttribute(name, value) {
		this.attributes.set(name, value);
	}

    // 生产dom结构
	render() {
		let children = this.attributes.get("data").map((url) => {
			let element = <img src={url} />;
			element.addEventListener("dragstart", (event) => event.preventDefault());
			return element;
		});
		let root = <div class='carousel'>{children}</div>;

		return root;
	}

    // 挂载到父节点
	mountTo(parent) {
		this.render().mountTo(parent);
	}

    // 收集子元素
	appendChild(child) {
		this.children.push(child);
	}

    // 其它方法，例如绑定事件监听、设置style样式等
    ...
}
```

## 轮播组件

- 基本结构：外层 div 元素套一组 img 元素

```
// 创建并挂载外层div
this.root = document.createElement("div");
this.root.classList.add("carousel");
this.data = data;

// 为每一张图片创建img元素
for (let d of data) {
    let element = document.createElement("img");
    element.src = d;
    // 阻止默认拖拽事件
    element.addEventListener("dragstart", event => event.preventDefault())
    this.root.appendChild(element);
}
```

- 基本css样式

```
.carousel {
    width: 500px;
    height: 300px;
    white-space: nowrap;
    outline: solid 1px blue;
    overflow: hidden;
    margin: auto;
}

.carousel img {
    width: 100%;
    height: 100%;
    display: inline-block;
    transition: transform ease 1s;
}
```

- 自动播放
```
let nextPic = () => {
    // 计算下一张图片索引
    let nextPosition = (position + 1) % this.data.length;
    // 获取当前图片和下一张图片dom元素
    let current = this.root.childNodes[position];
    let next = this.root.childNodes[nextPosition];
    // 图片初始位置
    current.style.transition = "ease 0s";
    next.style.transition = "ease 0s";
    current.style.transform = `translateX(${-100 * position}%)`;
    next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

    setTimeout(() => {
    // 去掉transtion属性，用css控制
    current.style.transition = "";
    next.style.transition = "";
    // 将两个图片向左移动一个身位
    current.style.transform = `translateX(${-100 -100 * position}%)`;
    next.style.transform = `translateX(${-100 * nextPosition}%)`;
    // 切换下一张为当前图片
    position = nextPosition;
 }, 16)
    // 设置自动执行间隔
    setTimeout(nextPic, 3000);
}
```

- 拖拽移动
```
// 监听mousedown事件
this.root.addEventListener("mousedown", event => {
    // 记录初始坐标
    let startX = event.clientX,
        startY = event.clientY;
    // 计算上一张图片和下一张图片的索引
    let lastPosition = (position - 1 + this.data.length) % this.data.length;
    let nextPosition = (position + 1) % this.data.length;

    // 得到当前图片与相邻两张图片的dom元素
    let current = this.root.childNodes[position];
    let last = this.root.childNodes[lastPosition];
    let next = this.root.childNodes[nextPosition];

    // 设置到初始位置
    current.style.transition = "ease 0s";
    last.style.transition = "ease 0s";
    next.style.transition = "ease 0s";

    current.style.transform = `translateX(${-500 * position}px)`
    last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`
    next.style.transform = `translateX(${500 - 500 * nextPosition}px)`

    // 鼠标移动事件
    let move = event => {
        // 将三张图片一起随鼠标移动，用当前的鼠标位置坐标结合之前记录的初始坐标计算元素位置
        current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
        last.style.transform =
            `translateX(${event.clientX - startX - 500 -500 * lastPosition}px)`
        next.style.transform =
            `translateX(${event.clientX - startX + 500 -500 * nextPosition}px)`
    };
    // 鼠标松开事件
    let up = event => {
        // 根据鼠标移动的距离判断状态为后退一张、前进一张还是不动，记录为offset
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

        // 根据offset将三张图片移动到标准位置
        current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`

        // 更新当前图片索引
        position = (position - offset + this.data.length) % this.data.length;

        // 解除鼠标移动、松开事件
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    }
    // 绑定鼠标移动、松开事件
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
})
```
