<template>
  <h1>Pokemon Page</h1>
  <h3>{{id}}</h3>
</template>

<script>
export default {
  props:{
    id:{
      type:Number,
      required:true
    }
  },

created(){
  const {id}= this.$route.params
}
}
</script>

