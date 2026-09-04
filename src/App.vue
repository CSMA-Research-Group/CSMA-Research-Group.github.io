<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content" @click.prevent="focusMain">Skip to main content</a>
    <Navbar />
    <main id="main-content" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import SiteFooter from './components/Footer.vue'

const focusMain = () => {
  document.getElementById('main-content')?.focus()
}
</script>
