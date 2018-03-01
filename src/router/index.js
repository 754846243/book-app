import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Content from 'components/content/content'
import Mine from 'components/mine/mine'
import Select from 'components/select/select'
import Backpack from 'components/backpack/backpack'
import Flowerpot from 'components/flowerpot/flowerpot'
import Seed from 'components/seed/seed'
import Book from 'components/book/book'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/select',
      component: Select
    },
    {
      path: '/test',
      component: Seed
    },
    {
      path: '/seed',
      component: Seed
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/content',
      component: Content,
      redirect: '/content/flowerpot',
      children: [
        {
          path: 'mine',
          component: Mine
        },
        {
          path: 'backpack',
          component: Backpack
        },
        {
          path: 'flowerpot',
          component: Flowerpot
        }
      ]
    }
  ],
  redirect: '/login'
})
