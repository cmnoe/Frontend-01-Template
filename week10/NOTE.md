# 每周总结可以写在这里

## DOM

### Range API

* var range = new Range()
* range.setStart(elment, 9)
* range.setEnd(element, 4)
* var range = document.getSelection().getRangeAt(0)
* range.setStartBefore
* range.SetEndBeofore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents
* var fragment = range.extractContents()
* range.insertNode(document.createTextNode('abc'))

## CSSOM API

document.styleSheets

### Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule('p { color: pink; }', 0)
* document.styleSheets[0].removeRule(0)

### Rule

对应 at-rule

* CSSStyleRule
* CSSCharsetRule
* CSSImportRule
* CSSMdediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule
* CSSStyleRule

### getComputedStyle

* window.getComputedStyle(elt, pseudoElt);
  * elt: 想要获取的元素
  * pseudoElt 可选，伪元素

## CSSOM views

### 窗口API

* moveBy(x, y)
* mobeTo(x, y) 
* resizeBy(x, y)
* resizeTo(x, y)
* window.open

### 视口滚动API

* window.scrollX
* window.scrollY
* window.scroll(x, y) 
* window.scrollBy(x, y) 

### 元素滚动API

* element.scrollLeft
* element.scrollTop 
* element.scrollWidth 
* element.scrollHeight 
* element.scrollBy(x, y)
* element.scrollTo(x, y)
* element.scrollIntoView(arg)
* scroll事件

### 布局API
* window.innerHeight, window.innerWidth 
* window.outerHeight, window.outerWidth
* window.devicePixelRatio 
* window.screen 