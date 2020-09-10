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
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group"
                      v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email"
                     class="form-control form-control-lg"
                     type="text"
                     placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password"
                     class="form-control form-control-lg"
                     type="password"
                     placeholder="Password">
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

import { register, login } from '@/api/auth'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        email: '',
        password: '',
      },
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
    onSubmit () {
      console.log(this.user, login)
      const data = login(this.user)
    },
  },
}
</script>
