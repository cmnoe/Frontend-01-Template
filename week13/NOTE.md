# 每周总结可以写在这里

## proxy和双向绑定

- 将数据用proxy封装，并定义get和set的拦截函数

- 定义effect函数，传入想要执行的操作函数handler

- 定义全局数组handlers，储存各个属性下的handler函数

- 在get拦截函数中收集被依赖的属性，储存到全局变量usedReactivities中

- effect中先清空usedReactivities，执行操作函数handler，此时相关的依赖属性会通过get函数传入usedReactivities，然后遍历usedReactivities，将handler推进handlers中相应的属性下

- 在set拦截函数中执行handlers下该属性的所有handler函数，实现effect函数想要的效果

## range实现DOM精确操作

- 监听dom元素的mouse相关事件实现拖动元素

- 使用range对象存储页面中的每一个文本，用getBoundingClientRect方法返回文本外框的矩形

- 计算dom拖动位置的坐标和文本矩形的坐标距离得到离dom最近的文本，将dom插入其后

