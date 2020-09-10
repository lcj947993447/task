import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _72335525 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _7584dccc = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _3aa62be4 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _777d21e4 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _552c835e = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _66647b68 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a9e89b4a = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _72335525,
    children: [{
      path: "/",
      component: _7584dccc,
      name: "home"
    }, {
      path: "/login",
      component: _3aa62be4,
      name: "login"
    }, {
      path: "/register",
      component: _3aa62be4,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _777d21e4,
      name: "profile"
    }, {
      path: "/settings",
      component: _552c835e,
      name: "settings"
    }, {
      path: "/editor",
      component: _66647b68,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a9e89b4a,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
