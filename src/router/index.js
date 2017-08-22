import Vue from 'vue'
import Router from 'vue-router'

function route (path, name) {
  return {
    path: path,
    name: name,
    component: () => import(`@/components/${name}.vue`)
  }
}

Vue.use(Router)

export default new Router({
  routes: [
    route('/', 'Home'),
    route('/equip/table', 'Table'),
    route('/motion/table', 'Test'),
    route('/good/table', 'Test3'),
    { path: '*', redirect: '/' }
  ]
})
