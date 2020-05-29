# 每周总结可以写在这里

## CSS Layout（flex布局）

1. 收集元素进入行排列

* 根据主轴的尺寸，把元素分别排进行内

* 如果设置了 no-wrap， 则所有元素分配在一行内

2. 计算主轴

* 找出所有flex元素

* 把主轴方向的剩余尺寸按比例分配给这些元素

* 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

3. 计算交叉轴

* 根据每行中最大元素尺寸计算行高

* 根据行高flex-align和item-align，确定元素具体位置

## CSS Render

1. 绘制单个元素

* 引入图形包images

* 绘制在一个 viewport 上进行

* 与绘制相关属性：background-color、border、background-image等

2. 绘制DOM

* 递归调用绘制方法完成 DOM 树的绘制

## 重学CSS

### @rules

* @charset

* @import

* @media

* @page

* @counter-style

* @keyframes

* @fontface

* @supports

* @namespace

### 一般rules

#### selector（selector_group、combinator、simple_selector）

#### key（property、variable）/ value