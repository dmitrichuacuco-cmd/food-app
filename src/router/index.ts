import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import OrderPage from '@/views/OrderPage.vue';
import PointsPage from '@/views/PointsPage.vue';
import PreviewPage from '@/views/PreviewPage.vue';
import SummaryPage from '@/views/SummaryPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/order',
    component: OrderPage,
  },
  {
    path: '/points',
    component: PointsPage,
  },
  {
    path: '/preview/:id', 
    name: 'Preview', 
    component: PreviewPage, 
    // refactor with usePages once proper backend is implemented
    props: (route) => ({
      id: route.params.id,
      order: route.query.order ? JSON.parse(route.query.order as string) : null
    })
  },
  {
    path: '/summary/:id', 
    name: 'Summary', 
    component: SummaryPage, 
    // refactor with usePages once proper backend is implemented
    props: (route) => ({
      id: route.params.id,
      order: route.query.order ? JSON.parse(route.query.order as string) : null,
      sides: route.query.sides ? JSON.parse(route.query.sides as string) : []
    }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
