// 导入snabbdom
import { init, h, thunk  } from 'snabbdom'
import { class } from "snabbdom/modules/class"
import { props } from "snabbdom/modules/props"
import { style } from "snabbdom/modules/style"
import { eventlisteners } from "snabbdom/modules/eventlisteners"

// init 返回值patch函数，作用对比两个vnode的差异更新到真是dom
// 参数：数组，模块
let patch = init([
  class,
  props,
  style,
  eventlisteners
])

