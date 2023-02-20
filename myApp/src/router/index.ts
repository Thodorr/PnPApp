import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import CharacterPage from '../views/CharacterPage.vue';
import AttributePage from "@/views/AttributePage.vue";
import InventoryPage from "@/views/InventoryPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Character'
  },
  {
    path: '/Character',
    name: 'Character',
    component: CharacterPage
  },
  {
    path: '/Attributes',
    name: 'Attributes',
    component: AttributePage
  },
  {
    path: '/Inventory',
    name: 'Inventory',
    component: InventoryPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
