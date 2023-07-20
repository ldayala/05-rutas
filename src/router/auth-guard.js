const isAuthenticatedGuard =async(to, from, next)=>{
    return new Promise(()=>{
      const rand=Math.random() *100
        if( rand> 50){
            console.log(rand,"  Autenticado - siiiii");
            next()
        }else{
            console.log(rand," error de autenticacion");
            next({name:'pokemon-home'})
        }
    })
}

export default isAuthenticatedGuard