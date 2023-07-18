<template>
   <nav-bar />
   <div class="logo">
    <img alt="Vue logo" src="./assets/logo.png"/>
    </div>
    
   <router-view></router-view>
    
</template>

<script>
import { defineAsyncComponent } from 'vue'
import AboutPage from './modules/pokemon/pages/AboutPage.vue'


export default {
  name: 'App',
  components: {
    AboutPage,
    NavBar: defineAsyncComponent(()=>import('./modules/shared/components/NavBar.vue'))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
   
 

}

.logo{
display: flex;
  justify-content: center;
  align-items: center;
}
</style>
