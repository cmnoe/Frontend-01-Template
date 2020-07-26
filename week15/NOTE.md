# 每周总结可以写在这里

## Vue 风格的 SFC
- 在webpack中自定义loader
   ```
   {
      test: /\.view$/,
      loader: require.resolve("./myloader.js"),
   }
   ```

- 拓展toyBrower的parse.js，使之能解析script标签中的内容

## 动画Animation

- 定义Animation和Timeline类

- 通过Animation类传入希望控制的css属性、初始状态、结束状态、时间变化函数、过程变化函数

- 通过Timeline类统一管理Animation类，通过当前与初始的时间差算出动画的中间状态，改变相应的css属性