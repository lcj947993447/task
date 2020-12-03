1.Vue 3.0 性能提升主要是通过哪几方面体现的
  1. 响应式系统升级
    Vue3使用Proxy对象重写了响应式系统

    Vue.js 2.x中响应式系统的核心 defineProperty，初始化的时候递归遍历所有的属性，转化为getter、setter
    Vue.js 3.0中使用Proxy对象重写响应式系统
    可监听动态新增的属性
    可以监听删除的属性
    可以监听数组的索引和length属性
  2. 编译优化
    重写了DOM提高渲染的性能。

    Vue.js 2.x中通过标记静态根节点，优化diff的过程
    Vue.js 3.0 中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
    Fragments（升级vetur插件）
    静态提升
    Patch flag
    缓存事件处理函数
  3.源码体积的优化
    通过优化源码的体积和更好的TreeShaking的支持，减少大打包的体积

    Vue.js 3.0中移除了一些不常用的API
    例如：inline-template、filter等
    Tree-shaking
    例如：Vue3中的没用到的模块不会被打包，但是核心模块会打包。Keep-Alive、transition等都是按需引入的


2.Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别
  1.Options APIs功能相关代码比较分散，一个功能需要根据固定的规则将函数分散在不同的模块中
    Composition Api根据逻辑功能来组织的，一个功能所定义的所有函数会放在一起
  2.Options APIs有this基本指向当前vue组件
    Composition Api没有 this
  3.Composition Api中对TypeScript更友好的支持

3.Proxy 相对于 Object.defineProperty 有哪些优点
  Proxy 可以直接监听数组的变化
  Proxy 可以直接监听对象而非属性
  Proxy 有 13 种拦截方法，比 Object.defineProperty 要更加丰富的多

4.Vue 3.0 在编译方面有哪些优化
  重写了DOM提高渲染的性能。

  Vue.js 2.x中通过标记静态根节点，优化diff的过程
  Vue.js 3.0 中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
    Fragments（升级vetur插件）
    静态提升
    Patch flag
    缓存事件处理函数

5.Vue.js 3.0 响应式系统的实现原理
  1.reactive:
    接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理
    创建拦截器对象 handler, 设置 get/set/deleteProperty
      get
        收集依赖（track）
        返回当前 key 的值。
        如果当前 key 的值是对象，则为当前 key 的对象创建拦截器 handler, 设置 get/set/deleteProperty
        如果当前的 key 的值不是对象，则返回当前 key 的值
      set
        设置的新值和老值不相等时，更新为新值，并触发更新（trigger）
        deleteProperty
        当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）
    返回 Proxy 对象
  2.effect: 接收一个函数作为参数 作用是：访问响应式对象属性时去收集依赖
  3.track:
    接收两个参数：target 和 key
    如果没有 activeEffect，则说明没有创建 effect 依赖
    如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性，
      WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
      WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
        depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
        depsMap 中有 key 属性，则添加这个 activeEffect
  4.trigger:
    判断 WeakMap 中是否有 target 属性
      WeakMap 中没有 target 属性，则没有 target 相应的依赖
      WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()


