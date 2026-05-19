<template>
  <div class="site-shell">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/Footer.vue'
</script>
