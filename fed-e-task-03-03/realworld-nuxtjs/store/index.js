// node 环境下使用的包，解析 cookie 字符串为 Javascript 对象
const cookieparser = process.server ? require('cookieparser') : undefined

// nuxt 已经集成了 vuex 直接创建 store 文件夹，nuxt 会自动读取
// 不过在服务端渲染期间运行的都是一个实例
// 为了防止冲突和污染，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用的登录状态
    user: null
  }
}
// 内部都是函数  不需要通过函数 return 的方式导出
export const mutations = {
  setUser (state, param) {
    state.user = param
  }
}

export const actions = {
  // nuxt 提供的一个特殊的 actions
  // 会在服务端渲染期间自动调用，切仅在服务端运行
  // 作用：初始化容器以及需要传递给客户端的数据
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 如果请求头有cookie
    if (req.headers.cookie)
    {
      const parsed = cookieparser.parse(req.headers.cookie)
      try
      {
        user = JSON.parse(parsed.user)
      } catch (err)
      {
        // No valid cookie found
      }
    }
    // 提交到容器中保证客户端使用
    commit('setUser', user)
  }
}