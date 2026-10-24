<template>
  <header ref="headerRef" class="site-navbar" :class="{ 'menu-open': isOpen }" @keydown.esc="handleEscape">
    <RouterLink class="brand" to="/" :aria-label="t('CSMA · Home')" @click="closeMenu">
      <span class="brand-mark" aria-hidden="true">{{ t(siteInfo.shortName) }}</span>
      <span>
        <strong>{{ t(siteInfo.name) }}</strong>
      </span>
    </RouterLink>

    <div ref="languageRef" class="language-switch" @focusout="closeLanguageOnBlur">
      <button ref="languageToggleRef" class="language-toggle" type="button"
        aria-label="Language / 语言" title="Language / 语言"
        :aria-expanded="isLanguageOpen" aria-controls="language-options"
        @click="toggleLanguage" @keydown.down.prevent="focusFirstLanguage">
        <svg class="language-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" />
        </svg>
      </button>
      <nav v-show="isLanguageOpen" id="language-options" class="language-menu" aria-label="Language / 语言">
        <LanguageLink v-for="language in languages" :key="language.code"
          :to="{ path: localizedPath(route.path, language.code), query: route.query, hash: route.hash }"
          :lang="language.htmlLang" :hreflang="language.htmlLang"
          :aria-current="locale === language.code ? 'true' : undefined"
          @click="selectLanguage(language.code)">
          <span>{{ language.label }}</span>
          <svg v-if="locale === language.code" class="language-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>
        </LanguageLink>
      </nav>
    </div>

    <button
      ref="toggleRef"
      class="nav-toggle"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="primary-navigation"
      :aria-label="t(isOpen ? 'Close navigation' : 'Open navigation')"
      @click="toggleNavigation"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav id="primary-navigation" class="nav-links" :aria-label="t('Primary navigation')">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        :class="{ active: unlocalizedPath(route.path) === item.path || unlocalizedPath(route.path).startsWith(`${item.path}/`) }"
        @click="closeMenu"
      >
        {{ t(item.label) }}
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { t, locale, localizedPath, unlocalizedPath, rememberLanguage } from '../i18n'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import RouterLink from './LocaleLink.vue'
import { useRoute, RouterLink as LanguageLink } from 'vue-router'
import { navigationItems, siteInfo } from '../data/site'

const route = useRoute()
const languages = [{ code: 'en', htmlLang: 'en', label: 'English' }, { code: 'zh', htmlLang: 'zh-CN', label: '简体中文' }]
const isOpen = ref(false)
const isLanguageOpen = ref(false)
const headerRef = ref(null)
const toggleRef = ref(null)
const languageRef = ref(null)
const languageToggleRef = ref(null)

const closeMenu = () => {
  isOpen.value = false
  isLanguageOpen.value = false
}

const toggleNavigation = () => {
  isLanguageOpen.value = false
  isOpen.value = !isOpen.value
}

const toggleLanguage = () => {
  isOpen.value = false
  isLanguageOpen.value = !isLanguageOpen.value
}

const focusFirstLanguage = async () => {
  isOpen.value = false
  isLanguageOpen.value = true
  await nextTick()
  languageRef.value?.querySelector('[hreflang]')?.focus()
}

const selectLanguage = async code => {
  rememberLanguage(code)
  closeMenu()
  await nextTick()
  languageToggleRef.value?.focus()
}

const closeLanguageOnBlur = event => {
  if (!languageRef.value?.contains(event.relatedTarget)) isLanguageOpen.value = false
}

const closeOutside = event => {
  if (!languageRef.value?.contains(event.target)) isLanguageOpen.value = false
  if (isOpen.value && !headerRef.value?.contains(event.target)) closeMenu()
}
onMounted(() => document.addEventListener('pointerdown', closeOutside))
onUnmounted(() => document.removeEventListener('pointerdown', closeOutside))

const handleEscape = async () => {
  if (isLanguageOpen.value) {
    isLanguageOpen.value = false
    await nextTick()
    languageToggleRef.value?.focus()
    return
  }
  if (!isOpen.value) return
  closeMenu()
  await nextTick()
  toggleRef.value?.focus()
}

watch(
  () => route.fullPath,
  () => closeMenu()
)
</script>
