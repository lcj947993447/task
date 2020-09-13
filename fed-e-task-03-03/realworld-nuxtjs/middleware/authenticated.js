/**
 * 中间件
 * 用于验证是否登录，权限设置
 */
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user)
  {
    return redirect('/login')
  }
}
