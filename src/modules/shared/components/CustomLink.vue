<template>
  <a v-if="isexternalLink" 
  target="_blank" 
  :href="link.to"
  class="normal-link"
  >{{ link.name }}</a>
  <router-link v-else :to="link.to" v-slot="{ href, isActive }">
    <a :href="href"
      :class="isActive ? 'is-active':'normal-link'"
    >{{ link.name }}</a> <!-- este :href apunta al slot que expone el router link -->
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isexternalLink() {
      console.log(this.$props);
      return this.link.to.startsWith("http");
      
    },
  },
};
</script>

<style scoped>
.is-active{
  color: #42b983;
}
.normal-link{
  color:#c6c5c5
}
</style>