import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import CharacterPage from '../views/CharacterPage.vue';
import AttributePage from "@/views/AttributePage.vue";
import InventoryPage from "@/views/InventoryPage.vue";
import SelectionPage from "@/views/SelectionPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Selection'
  },
  {
    path: '/Character/:id',
    name: 'Character',
    component: CharacterPage,
    props: true
  },
  {
    path: '/Attributes/:id',
    name: 'Attributes',
    component: AttributePage
  },
  {
    path: '/Inventory/:id',
    name: 'Inventory',
    component: InventoryPage
  },
  {
    path: '/Selection',
    name: 'Selection',
    component: SelectionPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
