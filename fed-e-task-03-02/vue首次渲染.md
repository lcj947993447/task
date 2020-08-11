### VUE首次渲染

总结：首先初始化 > 调用构造函数 > 设置 render (编译 template 或者 el ) > 触发beforeMount  > 定义updateComponent（用来调用vm.\_update()和vm.\_render()）> 创建Watch实例调用 updateComponent  > 触发mounted > 返回 vm，初次渲染完成

##### 1.vue初始化实例成员以及静态成员

##### 2.初始化完成后调用构造函数new vue()

##### 3.在构造函数中调用 this._init() 函数（整个文件的入口）

##### 4.在 this._init() 最后调用了vm.$mount()  
vm.$mount() 在 src/platforms/web/runtime/index.js 中定义，如果是完成版会在src/platforms/web/entry-runtime-with-compiler.js中重写

**重写**：使用 compileToFunctions() 把模板编译成 render 函数，将 render 函数存放到 options.render 中

**用途**：使vue支持template，否则在mountComponent会有警告

**注意**：首先判断是否传递 render 选项，如果未传入将 template 编译成 render 函数，如果 template 也没有，会将 el 中的内容作为 template

##### 5.在vm.$mount()中获取el，调用 mountComponent()
##### 6.mountComponent(this, el)
 1. 触发beforeMount生命周期（开始挂载之前）中的钩子函数， 

 2. 定义updateComponent (注：只是定义，没干别的)
    		updateComponent 中调用了 vm.\_update() 和 vm.\_render() 两个方法
        		（1）vm.\_update() 更新，将虚拟DOM转化为真实DOM
        		（2）vm.\_render() 渲染虚拟DOM
    
 3. 创建 Watch 实例，并将 updateComponent  传到 Watch 中，最后调用 watch.get()

 4. 触发mounted 生命周期中的钩子函数，挂载结束  

 5. 最后 return vm （返回vue 实例）

		**位置**：src/core/instaance/lifecycle.js

	**注意**：会判断是否传递 render 选项，如果未传入 render 但是传入了 template ，并且当前是开发环境的话会发送警告（运行时版本不支持编译器）

##### 7.watch.get()（在 watch 创建完成时会调用一次）
在 updateComponent 中创建 watch 最后被调用
 1. 调用 vm.\_render() 创建虚拟DOM(即VNode)
    		调用 render.call(vm._renderProxy, vm.$creatElemet)
        		调用实例化时 Vue 传入 render() 或者 编译 template 生成的 render()
        		返回VNode
 2. 调用 vm.\_update(vnode, ...)
		调用 vm._\_patch__(vm.\$el, vnode)
		将虚拟DOM转化成真实DOM挂载到页面中，并将真实保存到 vm.$el 中