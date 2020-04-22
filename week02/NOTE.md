# 每周总结

## 编程语言分类

* 非形式语言 （中文和英文）

* 形式语言 （乔姆斯基谱系）

  * 0型（无限制文法） ?::=?

  * 1型（上下文相关文法） ?<A>?::=?<B>?

  * 2型（上下文无关文法） <A>::=?

  * 3型（正则文法） <A>::=<A>?

## 形式语言产生式

* BNF

  * 终结符（引号和中间的字符）
  
  * 非终结符（尖括号括起来的复合结构）

  * 符号（()括号 *表示重复多次 |表示或 +表示至少异常）

* EBNF

* ABNF

## 图灵完备性

* 命令式--图灵机（使用if和for、while或是goto实现）

* 声明式--lambda（使用递归实现）

## 系统类型

* 动态或静态

* 强类型或弱类型（按是否有隐式转换区分）

* 复合类型

* 子类型（逆变和协变）

## Unicode
* 编码组Blocks（https://www.fileformat.info/info/unicode/block/index.htm）

* 常用字符

  * 常用拉丁字符（ASCII）：0-U+007F

  * CJK（中日韩文字符）：U+4E00-U+9FFF

  * BMP（绝对安全）：U+0000-U+FFFF

(小技巧：如需要用到中文变量名可用`\u十六进制unicode`转译)


## JS基本结构

### Atom

#### InputElement

- whiteSpace
  - Tab：制表符（打字机时代：制表时隔开数字很方便）
  - VT：纵向制表符
  - FF: FormFeed
  - SP: Space
  - NBSP: NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）
  - ZWNBSP
  - USP

- LineTerminator 换行符
  - LF: Line Feed `\n`
  - CR: Carriage Return `\r`
  - LS
  - PS

- Comment 注释（单行// 多行/**/）

- Token 记号：一切有效的东西

  - Punctuator: 符号 比如 `> = < }`
  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
    - Future reserved Keywords: `eum`
  - IdentifierName：标识符，可以以字母、_ 或者 $ 开头，用作变量、函数和属性
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
  - Literal: 直接量
    - Number
      - 存储 Uint8Array、Float64Array
      - 各种进制的写法
        - 二进制0b
        - 八进制0o
        - 十进制0x
      - 实践
        - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
        - 如何快捷查看一个数字的二进制：(97).toString(2)
    - String
      - Character
      - Code Point
      - Encoding
        - unicode编码 - utf
          - utf-8 可变长度 （控制位的用处）
      - Grammar
        - `''`、`""`、``` `
    - Boolean
    - Null
    - Undefind