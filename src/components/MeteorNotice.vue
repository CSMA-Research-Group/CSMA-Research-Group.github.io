<template>
  <div
    class="meteor-notice"
    :style="{ '--notice-hold': `${holdMs}ms`, '--notice-fade': `${fadeMs}ms` }"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <svg class="meteor-notice-icon" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false">
      <circle cx="20" cy="8" r="3.2" fill="currentColor" />
      <path d="M4 24 16.5 11.5M4 16 11 9M12 24 19 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </svg>
    <span>
      <strong>Lucky you!</strong>
      <small>You spotted a shooting star.</small>
    </span>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['dismiss'])
const holdMs = 3000
const fadeMs = 2000
let dismissTimer = 0

onMounted(() => {
  dismissTimer = window.setTimeout(() => emit('dismiss'), holdMs + fadeMs)
})

onUnmounted(() => {
  if (dismissTimer) window.clearTimeout(dismissTimer)
})
</script>

<style scoped>
.meteor-notice {
  position: absolute;
  bottom: 82px;
  left: 50%;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  max-width: calc(100% - 24px);
  padding: 9px 12px;
  border: 1px solid rgba(126, 236, 255, 0.22);
  border-radius: 7px;
  background: rgba(8, 26, 51, 0.86);
  box-shadow: 0 8px 24px rgba(2, 10, 25, 0.18);
  color: #cce8ff;
  opacity: 1;
  transform: translateX(-50%);
  pointer-events: none;
  animation: meteor-notice-fade var(--notice-fade) linear var(--notice-hold) forwards;
}
.meteor-notice-icon { flex: 0 0 25px; width: 25px; height: 25px; color: #aee9ff; }
.meteor-notice > span { display: grid; gap: 3px; min-width: 0; }
.meteor-notice strong { color: #f5fbff; font-size: 12px; line-height: 1.3; }
.meteor-notice small { font-size: 11px; line-height: 1.4; }
@keyframes meteor-notice-fade {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
