import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/pokemon",
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: () => import("@/modules/pokemon/layouts/PokemonLayout"),
    children: [
      {
        //para acceder a estas rutas tengo que hacerlo a traves del padre ejemplo /pokemon/home
        // esta es la ruta que va a hacer match cuando hacemos /pokemon si el path es "" ,si  queremos poner un patch ejemplo /home tenemos que
        // hacer una redirect al final con path =""
        path: "home",
        name: "pokemon-home",
        component: () =>
          import(
            /* webpackChunkBame: "AboutPage"*/ "@/modules/pokemon/pages/ListPage"
          ),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () => import("@/modules/pokemon/pages/AboutPage"),
      },
      {
        path: "pokemonid/:id",
        name: "pokemon-id",
        component: () => import("@/modules/pokemon/pages/PokemonPage"),
        props: (route) => {
          const { id } = route.params;

          // todo loque retornemos aqui será pasado como props al componenteque estamos montando
          return isNaN(Number(id)) ? { id: 1 } : { id: Number(id) }; //validamos que el para metro sea un numero
        },
      },
      {
        path:"",
       // redirect:"/pokemon/home"
       redirect:{name:'pokemon-home'}
      }
    ],
  },
  {
    path:"/dgz",
    name:"dgz",
    component: ()=>import('@/modules/dbz/layouts/DragonBallLayout'),
    children:[
      {
        path:"caracters",
        name:"dbz-caracters",
        component:()=>import('@/modules/dbz/pages/Caracters')
      },
      {
        path:"about",
        name:"dbz-about",
        component:()=>import('@/modules/dbz/pages/About')
      },
      {
        path:":pathMatch(.*)*",
        redirect:{name:'dbz'}
      }
    ]
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/modules/shared/pages/NoPageFound"),
  }, // patch por defecto si no es ninguno de los anteriores
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

//luego lo importamos en el main.js
export default router;
