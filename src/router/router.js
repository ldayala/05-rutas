
import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

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
    beforeEnter:[isAuthenticatedGuard], //listado con todos los guard que necesitamos
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

//-----------------guard para proteccion de rutas -----------------

//este es un guard global ya que se va a ejecutar antes de entrar a cualquier ruta

/*router.beforeEach((to,from,next)=>{

  if(Math.random()*100>50) {
    next()
  } else{
    console.log("you are not authorized");
    next({name:'pokemon'})
  }
   })
const canAccess=()=>{
return new Promise((resolve, reject) => {
  if(Math.random()*100>50) {
    console.log("Autenticado - Autorizado");
    resolve(true)
  } else{
    console.log("you are not authorized");
    resolve(false)
  }
})
}
router.beforeEach(async(to,from,next)=>{
  const authorized= await canAccess();

  authorized
    ? next()
    : next({name:'pokemon'})

})
*/
//luego lo importamos en el main.js
export default router;
