<template>
  <svg
    ref="overlayRef"
    class="vision-ambient"
    :class="{ 'is-paused': !isVisible || !isDocumentVisible }"
    viewBox="0 0 1774 887"
    aria-hidden="true"
    focusable="false"
  >
    <g ref="equatorRef" class="ambient-orbit ambient-orbit--equator" transform="rotate(-10 887 364)">
      <ellipse class="ambient-orbit-track" cx="887" cy="364" rx="278" ry="90" />
      <ellipse ref="equatorLightRef" class="ambient-orbit-light" cx="887" cy="364" rx="278" ry="90" pathLength="360" stroke-dasharray="38 322" />
      <ellipse ref="equatorEchoRef" class="ambient-orbit-light ambient-orbit-echo" cx="887" cy="364" rx="278" ry="90" pathLength="360" stroke-dasharray="14 346" stroke-dashoffset="180" />
      <ellipse ref="equatorDotRef" class="ambient-orbit-dot" cx="887" cy="364" rx="278" ry="90" pathLength="360" stroke-dasharray="0.4 359.6" />
    </g>
    <g class="ambient-orbit ambient-orbit--outer">
      <ellipse class="ambient-orbit-track" cx="887" cy="364" rx="214" ry="181" />
      <ellipse class="ambient-orbit-light" cx="887" cy="364" rx="214" ry="181" pathLength="360" stroke-dasharray="18 342" />
      <ellipse class="ambient-orbit-dot" cx="887" cy="364" rx="214" ry="181" pathLength="360" stroke-dasharray="0.4 359.6" />
    </g>
    <g
      v-for="(particle, index) in particles"
      :key="index"
      class="ambient-node"
      :transform="`translate(${particle.x} ${particle.y})`"
      :style="{ color: particle.color, '--pulse-duration': `${5 + index % 4}s`, '--pulse-delay': `${-index * 1.37}s` }"
    >
      <g class="ambient-particle">
        <circle class="ambient-particle-glow" r="8" />
        <circle r="3.2" />
      </g>
    </g>
  </svg>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { createVisionOrbitState, advanceVisionOrbit } from '../utils/visionMotion'

const overlayRef = ref(null)
const equatorRef = ref(null)
const equatorLightRef = ref(null)
const equatorEchoRef = ref(null)
const equatorDotRef = ref(null)
const isVisible = ref(false)
const isDocumentVisible = ref(true)
const orbitState = createVisionOrbitState()
let observer
let motionQuery
let frameId = 0
let lastFrameTime = 0

// Place small lights within the illustrations, clear of headings and captions.
const particles = [
  ...[[183, 216], [227, 260], [155, 309], [118, 266]].map(([x, y]) => ({ x, y, color: '#42c8ee' })),
  ...[[1545, 229], [1605, 259], [1665, 307], [1566, 336]].map(([x, y]) => ({ x, y, color: '#98a3ff' })),
  ...[[130, 458], [201, 521], [112, 564], [170, 589]].map(([x, y]) => ({ x, y, color: '#47cdbd' })),
  ...[[1536, 466], [1589, 502], [1661, 487], [1616, 547]].map(([x, y]) => ({ x, y, color: '#7ab9f3' })),
  ...[[754, 600], [1001, 582]].map(([x, y]) => ({ x, y, color: '#67d9f6' })),
]

const stopOrbit = () => {
  if (frameId) cancelAnimationFrame(frameId)
  frameId = 0
  lastFrameTime = 0
}

const canAnimate = () => isVisible.value && isDocumentVisible.value && !motionQuery?.matches

const animateOrbit = (time) => {
  frameId = 0
  if (!canAnimate()) return
  if (!lastFrameTime) lastFrameTime = time
  const elapsed = (time - lastFrameTime) / 1000
  if (elapsed >= 0.05) {
    advanceVisionOrbit(orbitState, elapsed)
    equatorRef.value?.setAttribute('transform', `rotate(${orbitState.tilt.toFixed(3)} 887 364)`)
    equatorLightRef.value?.setAttribute('stroke-dashoffset', orbitState.phase.toFixed(3))
    equatorEchoRef.value?.setAttribute('stroke-dashoffset', ((orbitState.phase + 180) % 360).toFixed(3))
    equatorDotRef.value?.setAttribute('stroke-dashoffset', ((orbitState.phase + 3) % 360).toFixed(3))
    lastFrameTime = time
  }
  frameId = requestAnimationFrame(animateOrbit)
}

const syncMotion = () => {
  if (!canAnimate()) { stopOrbit(); return }
  if (!frameId) frameId = requestAnimationFrame(animateOrbit)
}

const syncVisibility = () => {
  isDocumentVisible.value = !document.hidden
  syncMotion()
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener?.('change', syncMotion)
  syncVisibility()
  document.addEventListener('visibilitychange', syncVisibility)
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting
      syncMotion()
    })
    observer.observe(overlayRef.value)
  } else {
    isVisible.value = true
    syncMotion()
  }
})

onUnmounted(() => {
  stopOrbit()
  observer?.disconnect()
  motionQuery?.removeEventListener?.('change', syncMotion)
  document.removeEventListener('visibilitychange', syncVisibility)
})
</script>

<style scoped>
.vision-ambient {
  --ambient-play-state: running;
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.vision-ambient.is-paused { --ambient-play-state: paused; }
.ambient-orbit {
  --orbit-duration: 30s;
  --orbit-direction: normal;
  color: #60d7f4;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
}
.ambient-orbit--outer {
  --orbit-duration: 42s;
  --orbit-direction: reverse;
  color: #939cf5;
}
.ambient-orbit-track { stroke-width: 1.2; opacity: 0.15; }
.ambient-orbit-light,
.ambient-orbit-dot {
  animation: vision-orbit-turn var(--orbit-duration) linear infinite;
  animation-direction: var(--orbit-direction);
  animation-play-state: var(--ambient-play-state);
  filter: drop-shadow(0 0 5px currentColor);
}
.ambient-orbit-light { stroke-width: 3.2; opacity: 0.62; }
.ambient-orbit-dot { stroke-width: 5.5; opacity: 0.9; animation-delay: -4s; }
.ambient-orbit--equator .ambient-orbit-light,
.ambient-orbit--equator .ambient-orbit-dot { animation: none; }
.ambient-orbit--equator .ambient-orbit-light { stroke-width: 4; opacity: 0.78; }
.ambient-orbit--equator .ambient-orbit-echo { stroke-width: 2.2; opacity: 0.42; }
.ambient-orbit--outer .ambient-orbit-light { animation-delay: -17s; }
.ambient-orbit--outer .ambient-orbit-dot { animation-delay: -20s; }
.ambient-particle {
  fill: currentColor;
  animation: vision-node-pulse var(--pulse-duration) ease-in-out infinite;
  animation-delay: var(--pulse-delay);
  animation-play-state: var(--ambient-play-state);
}
.ambient-particle-glow { opacity: 0.18; }
@keyframes vision-orbit-turn {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -360; }
}
@keyframes vision-node-pulse {
  0%, 100% { opacity: 0.28; transform: translateY(2px); }
  50% { opacity: 0.85; transform: translateY(-3px); }
}
@media (max-width: 560px) {
  .ambient-node:nth-child(even) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .vision-ambient { display: none; }
  .ambient-orbit-light, .ambient-orbit-dot, .ambient-particle { animation: none; }
}
</style>
