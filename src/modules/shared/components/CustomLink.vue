<template>
  <a
    v-if="isexternalLink"
    target="_blank"
    :href="link.to"
    class="normal-link"
    >{{ link.name }}</a
  >
  <router-link v-else :to="rute" v-slot="{ isActive }">
    <a :class="isActive ? 'is-active' : 'normal-link'">{{ link.name }}</a>
    <!-- este :href apunta al slot que expone el router link -->
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
    
      return this.link.to.startsWith("http");
    },
    rute() {
      return this.link.id
        ? { name: `${this.link.to}`, params: { id: this.link.id } }
        : { name: `${this.link.to}` };
    },
  },
};
</script>

<style scoped>
.is-active {
  color: #42b983;
}
.normal-link {
  color: #c6c5c5;
}
</style>