# 每周总结可以写在这里

## 重学CSS
### 动画

#### Animation
- @keyframes定义
- animation:使用

- animation-name 时间曲线
- animation-duration 时间的时长
- animation-timing-function 动画的时间曲线
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

#### Transition
- transition-property 要变换的属性
- transition-duration 变换的时长
- transiton-timing-function 时间曲线
- transition-delay 延迟

### 颜色

- CMYK、RGB

- HSL、 HSV

### 形状(可以用data uri和svg来画各种图形)
- border
- box-shadow
- border-radius
- data uri+svg

## 重学HTML
### HTML的定义：XML与SGML
- 特殊字符："、&、<、>

### HTML标签：语义（WHATWG HTML Standard）

### HTML语法

#### 合法语法
- Element<tagname>...</tagname>
- Text:text
- Comment:<!--comments-->
- DocumentType:<!Doctype html>
- ProcessingInstruction<?a 1 ?>
- CDATA:<![CDATA[]]>

#### 字符引用
- &#161
- &amp
- &lt
- &quot

## 重学DOM

### Node

- Element:元素型节点，跟标签相对应
    - HTMLElement
        - HTMLAnchorElement
        - HTMLAppletElement
        - HTMLAreaElement
        - HTMLAudioElement
        - HTMLBaseElement
        - HTMLBodyElement
    - SVGElement
        - SVGAElement
        - SVGAltGyphElement
- Document：文档根节点
- CharacterData字符数据
    - Text：文本节点
        - CDATASection：CDATA节点
    - Comment：注释
    - ProcessingInstruction：处理信息
- DocumentFragment：文档片段
- DocumentType:文档类型

### 导航类操作
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

### 修改操作
- appendChild （当一个元素二次插入的时候，他会自动将第一次插入的位置移除）
- insertBefore
- removeChild （childNodes是一个leaving collection，会实时变化）
- replaceChild

### 高级操作
- compareDocumentPosition 是一个用于比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript中可以用===
cloneNode复制一个节点，如果传入参数true,则会连同子元素做深拷贝

## DOM API

- DOM Tree
- Events
- Range