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


