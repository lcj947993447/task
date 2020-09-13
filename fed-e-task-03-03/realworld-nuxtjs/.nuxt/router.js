import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7d1b0ac0 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _41244c56 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _0e85a933 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _5ce6f8f3 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _5d8f93ce = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _94b8be3a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _43b13c40 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7d1b0ac0,
    children: [{
      path: "/",
      component: _41244c56,
      name: "home"
    }, {
      path: "/login",
      component: _0e85a933,
      name: "login"
    }, {
      path: "/register",
      component: _0e85a933,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _5ce6f8f3,
      name: "profile"
    }, {
      path: "/settings",
      component: _5d8f93ce,
      name: "settings"
    }, {
      path: "/editor",
      component: _94b8be3a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _43b13c40,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
