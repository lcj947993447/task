// 发布者  get中收集依赖：收集观察者：收集依赖于该属性的watch对象  set中通知依赖：通知观察者：属性发生变化调用notify通知调用watch
class Dep {
  constructor () {
    // 存储所有的观察者
    this.subs = []
  }
  // 添加观察者
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 发送通知
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}