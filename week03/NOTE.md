# 每周总结可以写在这里

## 表达式、类型转换

### Grammar

用树形结构以及符号的优先级来实现表达式

1. Member（成员）
    * a.b

    * a[b]

    * foo`string`

    * super.b

    * super['b']

    * new.target

    * new Foo()

2. New

    * new Foo（特意提出来区分member和call使得表达式的结果符合直觉）

3. Call（调用）

    * foo()

    * super()

    * foo()['b']

    * foo().b

    * foo()`abc`

4. Left Handside & Right Handside（左右值）

5. Update（提升）

    * a++

    * a--

    * --a

    * ++a

6. Unary

    * delete a.b

    * void foo()

    * typeof a

    * +a

    * -a

    * ~a

    * !a

    * await a

7. Exponental（乘方）

    * '**'

8. Multiplicative（乘）

    * / * %

9. Additive（加）

    * '+' '-'

10. Shift（移位）

    * << >> >>>

11. Relationship（关系）

    * < > <= >= instanceof in

12. Equality（比较）

    * ==

    * !=

    * ===

    * !==

13. Bitwise（位运算）

    * & ^ |

14. Logical（逻辑）

    * &&

    * ||

15. Conditional（条件）

    * ? :

### Runtime

#### Type Convertion

|           | Number         | String           | Boolean        | Undefined | Null | Object | Symbol
| --------- | ------         | ------           | -------        | --------- | ---- | ------ | ------
| Number    | -              |                  | 0 false        | x         | x    | Boxing | x
| String    |                | -                | "" false       | x         | x    | Boxing | x
| Boolena   | true:1 false:0 | 'true' 'false'   | -              | x         | x    | Boxing | x
| Undefined | 0              | 'Undefined'      | false          | -         | x    | x      | x
| Null      | 0              | 'null'           | false          | x         | -    | x      | x
| Object    | valueOf        | valueOf toString | true           | x         | x    | -      | x
| Symbol    | x              | x                | x              | x         | x    | Boxing | -


## 语句、对象

### 语句

#### Runtime

1. Completion Record

    * [[type]]: mormal, break, continue, return, or throw
    * [[value]]: Types
    * [[target]]: label
2. Lexical Enviorment

#### Grammar

1. 简单语句

    * ExpressionStatement （表达式语句，一般用于计算）

    * EmptyStatement（空语句）

    * DebuggerStatement（调试语句）

    * ThrowStatement（抛错）

    * ContinueStatement（控制语句，跳至循环下一层）

    * BreakStatement（控制语句，跳出循环）

    * ReturnStatement（返回语句）

2. 复合语句

    * BlockStatement（块语句，提供作用域）

    * IfStatement（if分支语句）

    * SwitchStatement（switch分支语句）

    * IterationStatement（迭代，即循环语句for、while）

    * WithStatement（设置特定对象的作用域，不要用）

    * LeabelledStatement（标签语句，慎用）

    * TryStatement（异常处理）

3. 声明

    * FunctionDeclaration
  
    * GeneratorDeclaration

    * AsyncFunctionDeclaration

    * AsyncGeneratorDeclaration

    * VariableStatement

    * ClassDeclaration

    * LexicalDeclaration

4. 预处理

5. 作用域

### 对象

#### 三大要素

1. state（状态） 

2. behavior（行为）

3. identifier（唯一性）

#### 两种描述方法

1. Object-Class（类）

    * 归类 -- 多继承

    * 分类 -- 单继承

2. Object-Prototype（原型）

    * 用“相似”的方式描述，对象仅添加自身与原型的区别

    * 设计对象的状态和行为时，遵循“行为改变状态”原则

#### Object in JavaScript

* Property（属性）

  * Data Property（数据属性：描述状态）ps：当数据属性中存储函数时也可用于描述行为

    * [[value]]

    * writable

    * enumerable

    * configurable

  * Accessory Property（访问属性：描述行为）

    * get
    
    * set

    * enumerable

    * configurable

* Prototype（原型）

  当前对象没有我们要访问的属性时，会沿着原型链一直往上找

#### Object API

  1. {} . [] object.defineProperty

  2. Object.create/Object.setPrototypeOf/Object.getPrototypeOf（2、3不混用）

  3. new/class/extends（2、3不混用）

  4. new/function/prototype（弃用）






