import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    redirect:'/home',
   
  },
  
  {
    path: '/home',
    name:'home',
    component: () => import(/* webpackChunkBame: "AboutPage"*/'@/modules/pokemon/pages/ListPage')
  },
  {
    path: '/about',
    name:'about',
    component: () => import('@/modules/pokemon/pages/AboutPage')
  },
  {
    path: '/pokemonid/:id',
    name:'pokemon-id',
    component: () => import('@/modules/pokemon/pages/PokemonPage'),
    props: (route) => {
      const { id } = route.params
     
      // todo loque retornemos aqui será pasado como props al componenteque estamos montando
      return isNaN(Number(id)) ? { id: 1 } : { id: Number(id) } //validamos que el para metro sea un numero

    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/modules/shared/pages/NoPageFound')
  }, // patch por defecto si no es ninguno de los anteriores
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

//luego lo importamos en el main.js
export default router