<!-- login -->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin"
                       to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else
                       to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages"
                  :key="index">{{ field }} {{ message }}</li>
            </template>

          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group"
                      v-if="!isLogin">
              <input class="form-control form-control-lg"
                     v-model="user.username"
                     type="text"
                     placeholder="Your Name"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     v-model="user.email"
                     type="email"
                     placeholder="Email"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     v-model="user.password"
                     type="password"
                     placeholder="Password"
                     required
                     minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 客户端渲染下使用，cookie操作包  process.client nuxt 提供的环境变量
const Cookie = process.client ? require('js-cookie') : undefined
import { register, login } from '@/api/auth'

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {} // 错误信息
    }
  },
  computed: {
    isLogin () {
      // 不使用path 防止携带参数
      return this.$route.name === 'login'
    },
  },
  created () { },
  methods: {
    async onSubmit () {
      try
      {
        console.log(this.users)
        const { data } = this.isLogin ?
          await login({
            user: this.user
          })
          : await register({
            user: this.user
          })
        console.log(data)
        // 保存用户的登录状态 
        // 同构渲染需要考虑服务端渲染以及客户端渲染都可以拿到客户状态
        this.$store.commit('setUser', data.user)
        // 防止页面刷新，数据丢失，登录状态持久化
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (error)
      {
        console.log('请求失败', error)
        this.errors = error.response.data.errors
      }

    }
  },
}
</script>
