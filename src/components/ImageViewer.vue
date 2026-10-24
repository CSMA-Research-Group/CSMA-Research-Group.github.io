<template>
  <button ref="triggerRef" class="image-viewer-trigger" type="button" aria-haspopup="dialog" @click="openViewer">
    {{ t('View full image') }} <span aria-hidden="true">↗</span>
  </button>
  <dialog ref="dialogRef" class="image-viewer" :aria-labelledby="headingId" @close="finishClose" @click="closeBackdrop" @keydown.tab="keepFocusInside">
    <div class="image-viewer-toolbar">
      <h2 :id="headingId">{{ title }}</h2>
      <div class="image-viewer-actions">
        <button type="button" :aria-pressed="zoomed" @click="zoomed = !zoomed">{{ t(zoomed ? 'Fit to screen' : 'Actual size') }}</button>
        <a :href="src" target="_blank" rel="noopener noreferrer">{{ t('Open original image') }} <span aria-hidden="true">↗</span></a>
        <button type="button" autofocus class="image-viewer-close" @click="closeViewer">{{ t('Close') }} <span aria-hidden="true">×</span></button>
      </div>
    </div>
    <div class="image-viewer-canvas" :class="{ 'is-zoomed': zoomed }" tabindex="0" role="region" :aria-label="t('Image detail area')">
      <img :src="src" :alt="alt" decoding="async" />
    </div>
    <p class="image-viewer-help">{{ t('Zoom in and scroll to inspect details. Press Esc or use Close to return.') }}</p>
  </dialog>
</template>

<script setup>
import { onBeforeUnmount, ref, useId, watch } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '../i18n'

defineProps({ src: { type: String, required: true }, alt: { type: String, required: true }, title: { type: String, required: true } })
const route = useRoute()
const headingId = `image-viewer-${useId()}`
const dialogRef = ref(null)
const triggerRef = ref(null)
const zoomed = ref(false)
let isOpen = false
let previousOverflow = ''

const openViewer = () => {
  if (dialogRef.value?.open) return
  previousOverflow = document.body.style.overflow
  dialogRef.value.showModal()
  isOpen = true
  document.body.style.overflow = 'hidden'
}
const finishClose = () => {
  if (!isOpen) return
  isOpen = false
  zoomed.value = false
  document.body.style.overflow = previousOverflow
  if (triggerRef.value?.isConnected) triggerRef.value.focus({ preventScroll: true })
}
const closeViewer = () => {
  if (dialogRef.value?.open) dialogRef.value.close()
  finishClose()
}
const closeBackdrop = event => {
  if (event.target !== dialogRef.value) return
  const rect = dialogRef.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeViewer()
}
const keepFocusInside = event => {
  const controls = dialogRef.value.querySelectorAll('button, a[href], [tabindex="0"]')
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (event.shiftKey && event.target === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && event.target === last) {
    event.preventDefault()
    first.focus()
  }
}
watch(() => route.fullPath, closeViewer)
onBeforeUnmount(closeViewer)
</script>

<style scoped>
.image-viewer-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 7px; flex-shrink: 0; min-height: 44px; padding: 7px 12px; color: #315c72; background: #f0f5f8; border: 1px solid #d3e0e7; border-radius: 5px; font: inherit; font-size: 12px; font-weight: 650; cursor: pointer; }
.image-viewer-trigger:hover { color: #183c54; background: #e5eff4; border-color: #9bb8c6; }
.image-viewer { width: min(1340px, calc(100vw - 32px)); max-width: none; max-height: calc(100dvh - 32px); padding: 0; margin: auto; border: 1px solid #c5d5df; border-radius: 12px; background: #fff; box-shadow: 0 28px 100px #0b203b66; color: #19334b; }
.image-viewer::backdrop { background: #0b1e36bd; backdrop-filter: blur(6px); }
.image-viewer-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 14px 20px; border-bottom: 1px solid #dae4eb; }
.image-viewer h2 { margin: 0; font-size: 17px; line-height: 1.5; font-weight: 700; }
.image-viewer-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.image-viewer-actions :is(button, a) { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 8px 13px; border: 1px solid #d2dfe7; border-radius: 5px; background: #f5f8fa; color: #31566d; font: inherit; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; }
.image-viewer-actions .image-viewer-close { color: #fff; background: #203e57; border-color: #203e57; }
.image-viewer-actions .image-viewer-close span { font-size: 21px; line-height: 1; }
.image-viewer-canvas { display: grid; place-items: center; padding: 18px; overflow: auto; max-height: calc(100dvh - 190px); background: #edf3f7; overscroll-behavior: contain; }
.image-viewer-canvas img { display: block; width: auto; height: auto; max-width: 100%; max-height: calc(100dvh - 228px); }
.image-viewer-canvas.is-zoomed { display: block; place-items: normal; min-height: min(60vh, 540px); }
.image-viewer-canvas.is-zoomed img { width: auto; max-width: none; max-height: none; }
.image-viewer .image-viewer-help { margin: 0; padding: 12px 20px; font-size: 12px; line-height: 1.7; color: #506779; text-align: left; text-align-last: left; }
@media (max-width: 600px) {
  .image-viewer { width: calc(100vw - 16px); max-height: calc(100dvh - 16px); border-radius: 8px; }
  .image-viewer-toolbar { align-items: start; flex-direction: column; padding: 14px; gap: 10px; }
  .image-viewer h2 { font-size: 16px; }
  .image-viewer-actions { width: 100%; gap: 6px; }
  .image-viewer-actions :is(button, a) { flex: 1; padding-inline: 8px; font-size: 12px; }
  .image-viewer-canvas { padding: 8px; max-height: calc(100dvh - 220px); }
  .image-viewer-canvas img { max-height: calc(100dvh - 238px); }
  .image-viewer-canvas.is-zoomed { min-height: min(52vh, 420px); }
  .image-viewer .image-viewer-help { padding: 10px 14px; }
}
</style>
