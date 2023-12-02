import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogView from '../views/CatalogView.vue'
import TreatmentView from '../views/TreatmentView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView
  },
  {
    path: '/treatment',
    name: 'treatment',
    component: TreatmentView
  }
]

const router = new VueRouter({
  routes
})

export default router
