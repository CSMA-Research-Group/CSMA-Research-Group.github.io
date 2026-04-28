<template>
  <div class="app">
    <Navbar />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
.app {
  width: 100%;
}

.content {
  margin-top: 0; /* 不要占用 top，因为导航是 fixed 定位 */
}

</style>