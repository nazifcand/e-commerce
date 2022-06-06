import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import generatedRoutes from 'virtual:generated-pages'
import Maska from 'maska'
import App from './App.vue'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(Maska)
  .mount('#app')

// services
import { fetchMyAccount } from './services/user.service'
import { fetchCategories } from './services/category.service'

// stores
import { useAlertStore } from '@/stores/alert.store';
const alertStore = useAlertStore();

import { useMainStore } from '@/stores/main.store';
const mainStore = useMainStore();

router.beforeEach(async (to, from) => {

  // scroll to
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
    left: 0
  });

  const parentRoute = to.fullPath.split('/')[1] ?? null;
  const { token } = localStorage;

  // is logged in
  if (token && parentRoute == 'account') {
    router.push('/')
  }

  // is not logged in 
  if (!token && parentRoute != 'account' && parentRoute != 'page') {
    router.push('/account/login')
  }

  // initialize
  if (token && parentRoute != 'account') {

    const [myAccountError, myAccountData] = await fetchMyAccount()

    if (myAccountError && myAccountError.status == 401) {
      mainStore.isLoggedIn = false;
      localStorage.removeItem('token')
      return
    }

    if (!mainStore.categories.length) {
      const [categoriesError, categoriesData] = await fetchCategories({
        status: 'approved', parent__isnull: true
      });
      mainStore.categories = categoriesData;
    }

    if (!mainStore.featuredCategories.length) {
      const [categoriesError, categoriesData] = await fetchCategories({
        status: 'approved', is_featured: true
      });
      mainStore.featuredCategories = categoriesData;
    }

    mainStore.isLoggedIn = true;
    mainStore.user = myAccountData;
    mainStore.passiveNotifications = myAccountData.passive_notifications;
  }

  alertStore.removeAllAlerts()

  // check selected cart items
  if (to.name == 'cart-checkout' && !mainStore.selectedCartItems.length) {
    router.push('/cart')
  }

})