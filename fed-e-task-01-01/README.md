1.var a = []
    for (var i = 0; i < 10; i ++) {
        a[i] = function(){
            console.log(i)
        }
    }
    a[6]()
    10
    var定义i 因为JavaScript是单线程 优先将for循环执行完成 此时i = 10，
    这时调用a[6]因为本身内部作用域没有i即向上找得到i=10


2.
    var tmp = 123
    if (true) {
        console.log(tmp)
        let tmp
    }
    undefined --------- 报错
    var属于全局作用域有变量提升，let属于局部作用域
    编译过后代码片段
    var tmp = 123
    if (true) {
        console.log(_tmp)
        var _tmp
    }
    conloge.log打印为undefined


3.ES6新语法，最简单的方式找数组中的最小值
    var arr = [12, 34, 32, 89, 4]
    console.log(Math.min(...arr)); 
    首先使用...拓展运算符将分解arr
    然后利用Math.min()取最小值


4.请详细说明var,let,const三种声明变量的方式之间的具体差别？
    var变量声明可以赋值可以修改
    const变量声明时必须赋值且不可修改
    let变量声明时必须赋值且可修改

    在同一个作用域内再次声明同一个变量时 var会重新赋值 let和const不允许

    let是块级作用域，在当前块级作用域内使用let对当前块级作用域外无影响


5.
    var a = 10
    var obj = {
        a: 20,
        fn () {
            setTimeout(() => {
                console.log(this.a)
            })
        }
    }
    obj.fn()
    20
    因为obj.fn不是一个箭头函数 所以调用时this指向本身，即obj
    而obj.a = 20 


6.Symbol类型
    用来表示一个独一无二的值
    用来做对象的对象名 避免出现重复 实现成员私有
    让自定义对象实现JS的内置接口


7.浅拷贝，深拷贝
    浅拷贝是对值或者对象指向的地址的复制 修改一个另一个也会改变
    深拷贝将内容拷贝一份生成一个新的地址  修改其中一个不会改变另一个


8.JS异步编程，Event Loop 宏任务 微任务
    解决了JavaScript同时执行多个耗时任务的问题
    不等待耗时任务的执行，耗时任务开启过后立即执行下一个任务，后续逻辑通过回调函数的方式定义
    耗时任务完成过后立即执行回调函数 

    事件循环
    监听调用栈和消息队列
    调用栈中所有的任务都结束了 事件循环从消息队列中取出第一个回调函数压入到调用栈

    宏任务 同步任务
    微任务 同步任务的异步任务


9.
    setTimeout(function () {
        var a = 'Hello'
        setTimeout(function () {
            var b = 'Lagou'
            setTimeout(function () {
                var c = 'I Love U'
                console.log(a + b + c)
            }, 10)
        }, 10)
    }, 10)

    function timer (str) {
        return new Promise(function(resolve,reject){
            setTimeout(function () {
                resolve(str);
            }, 10)
        })
    }
    var a = 'Hello'
    timer('Hello').then(function(res){
        var b = 'Lagou'
        return timer(res + b)
    }).then(function(res){
        var c = 'I Love U'
        return timer(res + c)
    }).then(function(res){
    console.log(res)
    })


10.TypeScript JavaScript 关系
    TypeScript是基于JavaScript之上的语言
    TypeScript是JavaScript的超集（拓展集superset）
    包含JavaScript ES6+ 类型系统


    11.TypeScript 优缺点

    TypeScript解决了JavaScript类型系统上的不足
    大大提高代码的可靠程度

    因为TypeScript最终会编译为JavaScript
    所以任何JavaScript的运行环境都支持TypeScript 
    功能强大，生态更健全、更完善（相较于开发工具）

    语言本身多了很多概念  学习成本提高
    渐进式学习 前端第二门必要语言

    小成本项目：项目初期，Typescript需要类型声明会增加成本
    长期项目比较有优势
