<template>
  <RouterLink v-bind="$props" :to="localizedPath(to)"><slot /></RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { localizedPath } from '../i18n'
defineProps({ ...RouterLink.props })
</script>
