# 每周总结可以写在这里

## 手势
### mouse事件（网页端）
- 首先判断doucment.ontouchstart不为空
``` 
    let elememnt = document.body
    elememnt.addEventListener("mousedown",(event)=>{
        contexts[MOUSE_SYMBOL] = Object.create(null)
        start(event, contexts[MOUSE_SYMBOL])
        let mousemove = event=>{
            move(event, contexts[MOUSE_SYMBOL]）
        }
        let mouseend = event=>{
            end(event, contexts[MOUSE_SYMBOL])
            document.removeEventListener("mousemove",mousemove)
            document.removeEventListener("mouseup",mouseend)
        }
        document.addEventListener("mousemove",mousemove)
        document.addEventListener("mouseup",mouseend)
    })
```

### touch事件（移动端）
```
        elememnt.addEventListener("touchstart",event=>{
        for (const touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null)
            start(touch, contexts[touch.identifier])
            }
        })

        elememnt.addEventListener("touchmove",event=>{
            for (const touch of event.changedTouches) {
                move(touch,  contexts[touch.identifier])
            }
        })

        elememnt.addEventListener("touchend",event=>{
            for (const touch of event.changedTouches) {
                end(touch, contexts[touch.identifier])
                delete contexts[touch.identifier]
            }
        })

        elememnt.addEventListener("touchcancel",event=>{
            for (const touch of event.changedTouches) {
                cancel(touch, contexts[touch.identifier])
                delete contexts[touch.identifier]
            }
        })
```  

### 具体事件定义
```
let start = (point, context)=>{
    console.log('start',point.clientX,point.clientY)
}
let move = (point, context)=>{
    console.log('move',point.clientX,point.clientY)
}
let end = (point, context)=>{
    console.log('end',point.clientX,point.clientY)
}
let cancel = (point, context)=>{
    console.log('cancel')
}
```
### 判断手势类型
- tap
    - start事件触发之后
- press
    - tap状态持续一段时间（0.5s）之后进入pressstart
    - pressstart状态下触发end事件，进入pressend
- pan
    - presstart状态下触发move事件并且移动超过指定距离后（100px），连续触发presscancel状态和panstart状态
    - move过程中进入pan状态
    - pan状态下触发end事件，进入panend
- flick
    - end事件触发后如果在pan状态，计算滑动速度，超过一定值（2.5）进入filck状态

### 事件派发

- 使用dispatchEvent函数派发新的CustomEvent事件

## gesture应用于Carousel上

### 派发start、pan、panend三个事件

- start
    - 暂停自动翻页的动画，销毁计时器
    - 记录当前播放到的图片与标准位置的偏移量
```
            let onStart = _ => {
                timeline.pause()
                clearTimeout(nextPicStopHandler)

                let currentElement = children[currentPosition]
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]) 
                offset = currentTransformValue + 500 * currentPosition
            }
```

- pan
    - 计算拖拽距离，将当前图片以及其之前、之后三张图片移动到相应位置
    - 为保证最多移动一张图片，设置偏移范围在-500px到500px之间
```
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
```

- panend
    - 根据最后的移动位置算出图片移动方向
    - 重新播放动画，将前、中、后三张图片移动到正确的标准位置
    - 更新当前图片索引，重新设置计时器恢复自动播放
```
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
```

