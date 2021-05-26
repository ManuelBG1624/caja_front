import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import listado from '../components/listado.vue'
import ingresospordia from '../components/ingresoPordia.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  },
  {
    path: '/listado',
    name: 'Listado',
    component: listado
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  },
  {
    path: '/ingresospordia',
    component: ingresospordia
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
