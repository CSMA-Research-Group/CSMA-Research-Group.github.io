<template>
  <header class="site-navbar" :class="{ 'menu-open': isOpen }">
    <RouterLink class="brand" to="/" @click="closeMenu">
      <span class="brand-mark" aria-hidden="true">{{ siteInfo.shortName }}</span>
      <span>
        <strong>{{ siteInfo.name }}</strong>
        <small>{{ siteInfo.slogan }}</small>
      </span>
    </RouterLink>

    <button
      class="nav-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Toggle navigation"
      @click="isOpen = !isOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav-links" aria-label="Primary navigation">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        :class="{ active: route.path === item.path }"
        @click="closeMenu"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navigationItems, siteInfo } from '../data/site'

const route = useRoute()
const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu()
)
</script>
