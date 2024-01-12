import { createRouter, createWebHistory } from 'vue-router'
const {ref} = require("vue");
import { useRoute } from 'vue-router';
const route = useRoute()

import Api from '@/utils/Api';

// mobile app page

import HomeView from '@/views/HomeView.vue'
import BerdampakView from '@/views/BerdampakView.vue'
import ProductCatalog from '@/views/product/ProductCatalogView.vue'
import ProductCatalogDetail from '@/views/product/ProductCatalogDetailView.vue'
import ProductCatalogCheckout from '@/views/product/ProductCatalogCheckoutView.vue'

import SplashView from '@/views/authentication/SplashView.vue';
import LoginView from '@/views/authentication/LoginView.vue'
import VerifyOtpView from '@/views/authentication/VerifyOtpView.vue'
import RegistrationView from '@/views/authentication/RegistrationView.vue'

import ProgramView from '@/views/program/ProgramView.vue'
import BMIView from '@/views/program/BMIView.vue'
import ProfileView from '@/views/program/ProfileView.vue'
import RunningDeliveryView from '@/views/program/RunningDeliveryView.vue'
import OrderView from '@/views/program/OrderView.vue'
import DeliveryDetailView from '@/views/program/DeliveryDetailView.vue'
import MealPlanView from '@/views/program/MealPlanView.vue'
import DetailPackageView from '@/views/program/DetailPackageView.vue'

// membership & referral page 
import MembershipComingSoon from '@/views/referral/MembershipComingSoonView.vue'
import MembershipView from '@/views/referral/MembershipView.vue'
import ReferralView from '@/views/referral/ReferralView.vue'
import ReferralDetailView from '@/views/referral/ReferralDetailView.vue';
import FAQView from '@/views/referral/FAQView.vue'

const routes = [

  // auth
  {
    path: '/',
    name: 'splash',
    component: SplashView,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      
      if (user && token) {
        return next('/home')
      }

      return next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        return next('/home')
      }

      return next()
    }
  },
  {
    path: '/verify-otp',
    name: 'verify-otp',
    component: VerifyOtpView,
    beforeEnter: (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        return next('/home')
      }

      return next()
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
    beforeEnter: (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },


// program
{
    path: '/home',
    name: 'Home',
    component: HomeView,
    beforeEnter: (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/program',
    name: 'program',
    component: ProgramView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }

  },
  {
    path: '/home/runningdelivery',
    name: 'running-delivery',
    component: RunningDeliveryView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/bmi',
    name: 'bmi',
    component: BMIView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }


      return next()
    }
  },
  {
    path: '/detailpackage',
    name: 'detailpackage',
    component: DetailPackageView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!token || !user) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/product',
    name: 'product-catalog',
    component: ProductCatalog
  },
  {
    path: '/product/:id',
    name: 'product-catalog-detail',
    component: ProductCatalogDetail
  },
  {
    path: '/product/:id/checkout',
    name: 'product-catalog-checkout',
    component: ProductCatalogCheckout
  },
  {
    path: '/deliverydetail/:idOrder/:status/:product/:bottle',
    name:'deliverydetail',
    component: DeliveryDetailView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/mealplan',
    name:'meal plan',
    component: MealPlanView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path: '/membership',
    name: 'membership',
    component: MembershipView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },
  {
    path:'/membership-comingsoon',
    name: 'membership coming soon',
    component: MembershipComingSoon
  },
  {
    path: '/berdampak',
    name: 'berdampak-poin',
    component: BerdampakView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },


  // referral gaperlu pake auth karena dipakai oleh pihak eksternal
  {
    path: '/read',
    name: 'read more referral',
    component: ReferralDetailView,
    beforeEnter: async (to, from, next) => {

      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) {
        return next('/login')
      }

      return next()
    }
  },


// no auth page
  {
    path: '/invite/:id',
    name: 'referral',
    component: ReferralView,
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes
})

export default router
