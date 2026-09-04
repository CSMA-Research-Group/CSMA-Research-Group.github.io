<template>
  <section
    ref="wrapRef"
    class="vision-wrap"
    :class="[
      { 'has-active': activeArea, 'is-reduced-motion': reducedMotion },
      orbitDirectionClass,
    ]"
    aria-label="Interactive CSMA research vision"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div
      class="vision-stage"
      :class="activeArea ? `active-${activeArea}` : ''"
      :style="stageStyle"
    >
      <img
        class="vision-image"
        :src="visionImage"
        alt="CSMA research vision connecting cognitive intelligence, intelligent software engineering, intelligent robotics, and application scenarios"
        decoding="async"
        draggable="false"
      />

      <div v-if="!reducedMotion" class="particles" aria-hidden="true">
        <span
          v-for="particle in particles"
          :key="particle.id"
          :style="{
            '--p-left': `${particle.left}%`,
            '--p-top': `${particle.top}%`,
            '--p-size': `${particle.size}px`,
            '--p-delay': `${particle.delay}s`,
            '--p-duration': `${particle.duration}s`,
            '--p-opacity': particle.opacity,
            '--p-scale': particle.scale,
          }"
        />
      </div>

      <svg class="vision-overlay" viewBox="0 0 1774 887" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="visionSoftGlow" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stop-color="#8df8ff" stop-opacity="0.5" />
            <stop offset="45%" stop-color="#4c83ff" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#4c83ff" stop-opacity="0" />
          </radialGradient>
        </defs>

        <g class="flow-layer">
          <path
            v-for="area in areas"
            :key="`flow-${area.id}`"
            class="flow-line"
            :class="[`flow-${area.id}`, { 'is-active': activeArea === area.id, 'is-muted': activeArea && activeArea !== area.id }]"
            :d="area.flowPath"
          />
        </g>

        <g class="core-glow" :class="{ 'is-boosted': activeArea }" filter="url(#visionSoftGlow)">
          <circle cx="887" cy="386" r="168" fill="url(#coreGlow)" />
          <circle class="core-ring core-ring-one" cx="887" cy="386" r="154" />
          <circle class="core-ring core-ring-two" cx="887" cy="386" r="206" />
        </g>
      </svg>

      <div class="module-effects" aria-hidden="true">
        <div
          v-for="area in areas"
          :key="`effect-${area.id}`"
          class="module-effect"
          :class="[`effect-${area.id}`, { 'is-active': activeArea === area.id, 'is-muted': activeArea && activeArea !== area.id }]"
          :style="{
            left: `${area.effect.left}%`,
            top: `${area.effect.top}%`,
            width: `${area.effect.width}%`,
            height: `${area.effect.height}%`,
          }"
        >
          <template v-if="area.id === 'ai'">
            <span v-for="node in aiNodes" :key="node.id" class="cognitive-node" :style="node.style" />
            <span class="cognitive-pulse pulse-a" />
            <span class="cognitive-pulse pulse-b" />
          </template>

          <template v-if="area.id === 'software'">
            <span class="code-scanline" />
            <span v-for="stream in codeStreams" :key="stream.id" class="code-stream" :style="stream.style" />
          </template>

          <template v-if="area.id === 'robotics'">
            <span class="robot-ring ring-a" />
            <span class="robot-ring ring-b" />
            <span class="robot-sweep" />
          </template>

          <template v-if="area.id === 'applications'">
            <span class="city-grid" />
            <span v-for="star in cityStars" :key="star.id" class="city-star" :style="star.style" />
          </template>
        </div>
      </div>

      <div class="feedback-orbit-layer" aria-hidden="true">
        <svg viewBox="0 0 500 180" focusable="false">
          <ellipse class="orbit-ring ring-1" cx="250" cy="92" rx="210" ry="48" />
          <ellipse class="orbit-ring ring-2" cx="250" cy="92" rx="160" ry="34" />
          <ellipse class="orbit-ring ring-3" cx="250" cy="92" rx="105" ry="22" />
          <path class="orbit-spark spark-a" d="M58 92 C130 52 370 52 442 92" />
          <path class="orbit-spark spark-b" d="M98 100 C170 130 330 130 402 100" />
        </svg>
      </div>

      <div class="hotspots" aria-hidden="false">
        <button
          v-for="area in areas"
          :key="area.id"
          class="hotspot"
          :class="[`hotspot-${area.id}`, { 'is-active': activeArea === area.id, 'is-muted': activeArea && activeArea !== area.id }]"
          :style="{
            left: `${area.hotspot.left}%`,
            top: `${area.hotspot.top}%`,
            width: `${area.hotspot.width}%`,
            height: `${area.hotspot.height}%`,
          }"
          type="button"
          :aria-label="`${area.title}: ${area.tooltip.text} Open research direction.`"
          @mouseenter="setActiveArea(area.id)"
          @mouseleave="clearActiveArea"
          @focus="setActiveArea(area.id)"
          @blur="clearActiveArea"
          @click="navigateToArea(area)"
        >
          <span class="sr-only">{{ area.title }}</span>
        </button>
      </div>
    </div>

    <div v-if="activeAreaData" class="vision-tooltip-layer" aria-live="polite">
      <div
        class="vision-tooltip"
        :class="[tooltipPlacementClass, tooltipAreaClass]"
        :style="tooltipStyle"
        role="status"
      >
        <strong>{{ activeAreaData.title }}</strong>
        <span>{{ activeAreaData.tooltip.text }}</span>
      </div>
    </div>

    <nav class="vision-mobile-links" aria-label="Research vision directions">
      <RouterLink
        v-for="area in areas"
        :key="`mobile-${area.id}`"
        :to="{ path: '/research', hash: area.targetHash }"
      >
        <strong>{{ area.title }}</strong>
        <span>{{ area.tooltip.text }}</span>
      </RouterLink>
    </nav>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const visionImage = `${import.meta.env.BASE_URL}figures/csma-research-vision.svg`
const router = useRouter()
const wrapRef = ref(null)
const activeArea = ref(null)
const reducedMotion = ref(false)
const pointer = reactive({
  x: 0,
  y: 0,
  orbitIntensity: 0,
})

let motionQuery
let frameId = 0
let lastPointerEvent = null

const areas = [
  {
    id: 'ai',
    title: 'Cognitive Intelligence',
    color: '#55ddff',
    targetHash: '#artificial-intelligence',
    flowPath: 'M887 386 C820 284 710 236 614 234',
    hotspot: { left: 7.8, top: 16, width: 27.2, height: 24 },
    effect: { left: 5.6, top: 13.6, width: 29, height: 27 },
    tooltip: {
      left: 23.5,
      top: 38.5,
      placement: 'below',
      text: 'Cognition, reasoning, planning, memory, and reflection.',
    },
  },
  {
    id: 'software',
    title: 'Intelligent Software Engineering',
    color: '#61f2d3',
    targetHash: '#intelligent-software-engineering',
    flowPath: 'M887 386 C960 284 1060 235 1146 234',
    hotspot: { left: 64.2, top: 16.2, width: 28.6, height: 24 },
    effect: { left: 63.6, top: 13.8, width: 30.5, height: 27 },
    tooltip: {
      left: 72.5,
      top: 38.5,
      placement: 'below',
      text: 'Requirements, code generation, debugging, and repair.',
    },
  },
  {
    id: 'robotics',
    title: 'Intelligent Robotics',
    color: '#9d77ff',
    targetHash: '#intelligent-robotics',
    flowPath: 'M887 386 C794 492 707 490 611 489',
    hotspot: { left: 7.8, top: 45, width: 27.2, height: 24 },
    effect: { left: 4.8, top: 43.2, width: 30.2, height: 28 },
    tooltip: {
      left: 18,
      top: 45,
      placement: 'above',
      text: 'Perception, planning, control, and embodied intelligence.',
    },
  },
  {
    id: 'applications',
    title: 'Application Scenarios',
    color: '#b887ff',
    targetHash: '#application-scenarios',
    flowPath: 'M887 386 C982 492 1060 492 1150 492',
    hotspot: { left: 64.2, top: 44.6, width: 28.6, height: 25 },
    effect: { left: 64, top: 43, width: 31.5, height: 29 },
    tooltip: {
      left: 69.6,
      top: 45,
      placement: 'above',
      text: 'Prototypes, validation, deployment, and real-world systems.',
    },
  },
]

const seededRandom = (seed) => {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }
}

const random = seededRandom(20260519)
const range = (min, max) => min + random() * (max - min)

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: Number(range(3, 97).toFixed(2)),
  top: Number(range(7, 92).toFixed(2)),
  size: Number(range(2, 5.2).toFixed(2)),
  delay: Number(range(-14, 2).toFixed(2)),
  duration: Number(range(13, 27).toFixed(2)),
  opacity: Number(range(0.2, 0.72).toFixed(2)),
  scale: Number(range(0.72, 1.45).toFixed(2)),
}))

const aiNodes = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  style: {
    left: `${range(12, 84).toFixed(2)}%`,
    top: `${range(14, 78).toFixed(2)}%`,
    animationDelay: `${range(-6, 1).toFixed(2)}s`,
    animationDuration: `${range(4.8, 8.4).toFixed(2)}s`,
  },
}))

const codeStreams = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  style: {
    left: `${range(10, 88).toFixed(2)}%`,
    top: `${range(18, 82).toFixed(2)}%`,
    animationDelay: `${range(-5, 0).toFixed(2)}s`,
    animationDuration: `${range(5.5, 9.5).toFixed(2)}s`,
  },
}))

const cityStars = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  style: {
    left: `${range(10, 90).toFixed(2)}%`,
    top: `${range(18, 82).toFixed(2)}%`,
    animationDelay: `${range(-8, 1).toFixed(2)}s`,
    animationDuration: `${range(5.5, 11).toFixed(2)}s`,
  },
}))

const activeAreaData = computed(() => areas.find((area) => area.id === activeArea.value))

const orbitDirectionClass = computed(() => {
  if (reducedMotion.value || pointer.orbitIntensity < 0.14) return 'is-center'
  return pointer.x < 0 ? 'is-left' : 'is-right'
})

const stageStyle = computed(() => {
  const orbitSpeed = reducedMotion.value ? 14 : 12 - pointer.orbitIntensity * 5

  return {
    '--mouse-x': reducedMotion.value ? 0 : pointer.x.toFixed(4),
    '--mouse-y': reducedMotion.value ? 0 : pointer.y.toFixed(4),
    '--orbit-speed': `${orbitSpeed.toFixed(2)}s`,
    '--orbit-speed-slow': `${(orbitSpeed * 1.24).toFixed(2)}s`,
    '--orbit-speed-fast': `${(orbitSpeed * 0.82).toFixed(2)}s`,
    '--orbit-speed-spark': `${(orbitSpeed * 1.16).toFixed(2)}s`,
    '--orbit-intensity': reducedMotion.value ? 0 : (0.28 + pointer.orbitIntensity * 0.38).toFixed(3),
    '--orbit-spark-opacity': reducedMotion.value ? 0 : ((0.28 + pointer.orbitIntensity * 0.38) * 0.86).toFixed(3),
    '--active-color': activeAreaData.value?.color || '#55ddff',
  }
})

const tooltipPlacementClass = computed(() => {
  const placement = activeAreaData.value?.tooltip.placement || 'above'
  return `tooltip--${placement}`
})

const tooltipAreaClass = computed(() => (
  activeAreaData.value?.id === 'robotics' ? 'robotics' : null
))

const tooltipStyle = computed(() => {
  const area = activeAreaData.value
  if (!area) return {}

  if (area.id === 'robotics') {
    return {
      left: 'clamp(32px, 10%, 120px)',
      top: '42%',
      '--tooltip-color': area.color,
    }
  }

  return {
    left: `clamp(16%, ${area.tooltip.left}%, 84%)`,
    top: `clamp(12%, ${area.tooltip.top}%, 88%)`,
    '--tooltip-color': area.color,
  }
})

const setActiveArea = (areaId) => {
  activeArea.value = areaId
}

const clearActiveArea = () => {
  activeArea.value = null
}

const updateFromPointer = () => {
  frameId = 0
  if (!lastPointerEvent || !wrapRef.value || reducedMotion.value) return

  const rect = wrapRef.value.getBoundingClientRect()
  const xRatio = Math.min(1, Math.max(0, (lastPointerEvent.clientX - rect.left) / rect.width))
  const yRatio = Math.min(1, Math.max(0, (lastPointerEvent.clientY - rect.top) / rect.height))

  pointer.x = xRatio - 0.5
  pointer.y = yRatio - 0.5
  pointer.orbitIntensity = Math.min(1, Math.abs(xRatio - 0.5) * 2)
}

const handlePointerMove = (event) => {
  if (event.pointerType === 'touch' || reducedMotion.value) return
  lastPointerEvent = event
  if (!frameId) frameId = requestAnimationFrame(updateFromPointer)
}

const handlePointerLeave = () => {
  lastPointerEvent = null
  pointer.x = 0
  pointer.y = 0
  pointer.orbitIntensity = 0
  clearActiveArea()
}

const navigateToArea = async (area) => {
  await router.push({ path: '/research', hash: area.targetHash })
}

const syncReducedMotion = () => {
  reducedMotion.value = Boolean(motionQuery?.matches)
  if (reducedMotion.value) handlePointerLeave()
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncReducedMotion()
  motionQuery.addEventListener?.('change', syncReducedMotion)
})

onUnmounted(() => {
  motionQuery?.removeEventListener?.('change', syncReducedMotion)
  if (frameId) cancelAnimationFrame(frameId)
})
</script>

<style scoped>
.vision-wrap {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: visible;
  contain: layout;
}

.vision-stage {
  --mouse-x: 0;
  --mouse-y: 0;
  --orbit-speed: 12s;
  --orbit-intensity: 0.28;
  --orbit-spark-opacity: 0.24;
  --active-color: #55ddff;
  position: relative;
  width: 100%;
  aspect-ratio: 1774 / 887;
  overflow: hidden;
  border: 1px solid rgba(137, 211, 255, 0.26);
  border-radius: 8px;
  background: #041226;
  box-shadow:
    0 24px 60px rgba(4, 18, 38, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  transform:
    perspective(1400px)
    rotateX(calc(var(--mouse-y) * -2.2deg))
    rotateY(calc(var(--mouse-x) * 2.8deg))
    translate3d(calc(var(--mouse-x) * 6px), calc(var(--mouse-y) * 4px), 0);
  transform-style: preserve-3d;
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 240ms ease;
}

.vision-stage:hover,
.vision-stage:focus-within {
  box-shadow:
    0 26px 70px rgba(4, 18, 38, 0.24),
    inset 0 0 0 1px rgba(137, 211, 255, 0.1);
}

.vision-image,
.vision-overlay,
.module-effects,
.particles,
.hotspots {
  position: absolute;
  inset: 0;
}

.vision-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  transform: translate3d(calc(var(--mouse-x) * -4px), calc(var(--mouse-y) * -3px), 0);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.vision-overlay {
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform: translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -6px), 0);
}

.core-ring {
  fill: none;
  stroke: rgba(137, 248, 255, 0.62);
  stroke-width: 2.5;
  transform-box: fill-box;
  transform-origin: center;
  animation: coreBreathe 6.2s ease-in-out infinite;
}

.core-ring-two {
  stroke: rgba(104, 126, 255, 0.48);
  stroke-width: 1.8;
  animation-delay: -2.1s;
  animation-duration: 7.4s;
}

.core-glow {
  opacity: 0.74;
  transition: opacity 220ms ease, transform 240ms ease;
  transform-origin: center;
}

.core-glow.is-boosted {
  opacity: 1;
  transform: scale(1.012);
}

.flow-line {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 14 36;
  opacity: 0.66;
  filter: drop-shadow(0 0 7px currentColor);
  vector-effect: non-scaling-stroke;
  animation: flowRun 4.6s linear infinite;
  transition:
    opacity 200ms ease,
    stroke-width 200ms ease,
    filter 200ms ease;
}

.flow-line.is-active {
  opacity: 1;
  stroke-width: 6;
  stroke-dasharray: 18 24;
  animation-duration: 2.7s;
  filter: drop-shadow(0 0 12px currentColor);
}

.flow-line.is-muted {
  opacity: 0.22;
}

.flow-ai {
  color: #55ddff;
  stroke: #55ddff;
  animation-delay: -0.6s;
}

.flow-software {
  color: #61f2d3;
  stroke: #61f2d3;
  animation-delay: -1.5s;
}

.flow-robotics {
  color: #9d77ff;
  stroke: #9d77ff;
  animation-delay: -2.4s;
}

.flow-applications {
  color: #b887ff;
  stroke: #b887ff;
  animation-delay: -3.1s;
}

.particles {
  pointer-events: none;
  transform: translate3d(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -8px), 0);
}

.particles span {
  position: absolute;
  left: var(--p-left);
  top: var(--p-top);
  width: var(--p-size);
  height: var(--p-size);
  border-radius: 999px;
  background: rgba(137, 229, 255, var(--p-opacity));
  box-shadow: 0 0 14px rgba(137, 229, 255, 0.68);
  opacity: var(--p-opacity);
  transform: scale(var(--p-scale));
  animation: particleFloat var(--p-duration) ease-in-out infinite;
  animation-delay: var(--p-delay);
}

.module-effects {
  pointer-events: none;
  transform: translate3d(calc(var(--mouse-x) * -6px), calc(var(--mouse-y) * -4px), 0);
}

.module-effect {
  position: absolute;
  border-radius: 12px;
  opacity: 0.5;
  transition:
    opacity 220ms ease,
    transform 220ms ease,
    filter 220ms ease;
}

.module-effect.is-active {
  opacity: 1;
  transform: scale(1.025);
  filter: drop-shadow(0 0 18px var(--active-color));
}

.module-effect.is-muted {
  opacity: 0.18;
}

.cognitive-node {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: rgba(87, 223, 255, 0.82);
  box-shadow: 0 0 13px rgba(87, 223, 255, 0.8);
  animation: neuralPulse 6.3s ease-in-out infinite;
}

.cognitive-pulse {
  position: absolute;
  left: 18%;
  top: 12%;
  width: 56%;
  height: 70%;
  border: 1px solid rgba(85, 221, 255, 0.26);
  border-radius: 50%;
  animation: cognitiveWave 7.8s ease-in-out infinite;
}

.pulse-b {
  left: 25%;
  top: 20%;
  width: 42%;
  height: 54%;
  animation-delay: -3.4s;
  animation-duration: 9.1s;
}

.code-scanline {
  position: absolute;
  inset: 14% 8%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(97, 242, 211, 0) 42%,
    rgba(97, 242, 211, 0.2) 50%,
    rgba(97, 242, 211, 0) 58%,
    transparent 100%
  );
  animation: softwareScan 7.2s ease-in-out infinite;
}

.code-stream {
  position: absolute;
  width: 2px;
  height: 22%;
  border-radius: 999px;
  background: linear-gradient(180deg, transparent, rgba(97, 242, 211, 0.82), transparent);
  animation: codeData 7.4s ease-in-out infinite;
}

.robot-ring {
  position: absolute;
  left: 10%;
  bottom: 0;
  width: 42%;
  aspect-ratio: 1;
  border: 1px solid rgba(157, 119, 255, 0.35);
  border-radius: 999px;
  animation: robotEnergy 6.8s ease-in-out infinite;
}

.ring-b {
  left: 4%;
  bottom: -8%;
  width: 54%;
  animation-delay: -2.6s;
  animation-duration: 8.5s;
}

.robot-sweep {
  position: absolute;
  left: 5%;
  top: 10%;
  width: 68%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(157, 119, 255, 0.78), transparent);
  animation: robotSweep 8.2s ease-in-out infinite;
}

.city-grid {
  position: absolute;
  inset: 20% 4% 10% 4%;
  background-image:
    linear-gradient(rgba(184, 135, 255, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(184, 135, 255, 0.16) 1px, transparent 1px);
  background-size: 26px 20px;
  mask-image: radial-gradient(circle at 70% 62%, rgba(0, 0, 0, 0.74), transparent 72%);
  animation: cityGrid 12s linear infinite;
}

.city-star {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: rgba(184, 135, 255, 0.86);
  box-shadow: 0 0 12px rgba(184, 135, 255, 0.72);
  animation: cityTwinkle 8s ease-in-out infinite;
}

.feedback-orbit-layer {
  position: absolute;
  left: 32%;
  top: 61%;
  width: 36%;
  height: 18%;
  pointer-events: none;
  z-index: 8;
  opacity: var(--orbit-intensity, 0.42);
  mix-blend-mode: screen;
  transition:
    opacity 360ms ease,
    filter 360ms ease;
}

.feedback-orbit-layer svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.orbit-ring,
.orbit-spark {
  fill: none;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  animation: orbitDash var(--orbit-speed, 12s) linear infinite;
}

.orbit-ring {
  stroke: rgba(80, 220, 255, 0.56);
  stroke-width: 1.45;
  stroke-dasharray: 18 26;
  opacity: var(--orbit-intensity, 0.42);
  filter: drop-shadow(0 0 5px rgba(80, 220, 255, 0.42));
}

.ring-2 {
  stroke: rgba(128, 154, 255, 0.46);
  stroke-width: 1.15;
  stroke-dasharray: 12 24;
  animation-duration: var(--orbit-speed-slow, 14.88s);
}

.ring-3 {
  stroke: rgba(184, 135, 255, 0.42);
  stroke-width: 1;
  stroke-dasharray: 10 18;
  animation-duration: var(--orbit-speed-fast, 9.84s);
}

.orbit-spark {
  stroke: rgba(160, 245, 255, 0.34);
  stroke-width: 1.25;
  stroke-dasharray: 6 32;
  opacity: var(--orbit-spark-opacity, 0.36);
  filter: drop-shadow(0 0 6px rgba(80, 220, 255, 0.34));
}

.spark-b {
  stroke: rgba(184, 135, 255, 0.28);
  animation-duration: var(--orbit-speed-spark, 13.92s);
  animation-delay: -3.4s;
}

.vision-wrap.is-left .orbit-ring,
.vision-wrap.is-left .orbit-spark {
  animation-direction: normal;
}

.vision-wrap.is-right .orbit-ring,
.vision-wrap.is-right .orbit-spark {
  animation-direction: reverse;
}

.vision-wrap.is-center .orbit-ring,
.vision-wrap.is-center .orbit-spark {
  animation-duration: 14s;
  opacity: 0.28;
}

.hotspots {
  z-index: 4;
  pointer-events: none;
}

.hotspot {
  position: absolute;
  border: 0;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  transform: translateZ(36px);
}

.hotspot::before {
  position: absolute;
  inset: -5px;
  border: 1px solid rgba(137, 229, 255, 0);
  border-radius: 14px;
  background: rgba(81, 197, 255, 0);
  box-shadow: 0 0 0 rgba(81, 197, 255, 0);
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 180ms ease,
    transform 220ms ease,
    border-color 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
  content: "";
}

.hotspot:hover::before,
.hotspot:focus-visible::before,
.hotspot.is-active::before {
  opacity: 1;
  transform: scale(1.035);
  border-color: rgba(137, 229, 255, 0.72);
  background: rgba(81, 197, 255, 0.07);
  box-shadow: 0 0 28px rgba(81, 197, 255, 0.3);
}

.hotspot-robotics:hover::before,
.hotspot-robotics:focus-visible::before,
.hotspot-robotics.is-active::before,
.hotspot-applications:hover::before,
.hotspot-applications:focus-visible::before,
.hotspot-applications.is-active::before {
  border-color: rgba(184, 135, 255, 0.74);
  background: rgba(139, 92, 246, 0.08);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.32);
}

.hotspot:focus-visible {
  outline: 3px solid #7eecff;
  outline-offset: 4px;
}

.vision-tooltip-layer {
  position: absolute;
  inset: 0;
  z-index: 50;
  overflow: visible;
  pointer-events: none;
}

.vision-tooltip {
  position: absolute;
  z-index: 50;
  max-width: min(290px, 38%);
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--tooltip-color) 62%, transparent);
  border-radius: 8px;
  background: rgba(4, 18, 38, 0.82);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22), 0 0 22px color-mix(in srgb, var(--tooltip-color) 24%, transparent);
  color: #dceeff;
  pointer-events: none;
  backdrop-filter: blur(10px);
}

.tooltip--below {
  transform: translate(-50%, 12px);
}

.tooltip--above {
  transform: translate(-50%, calc(-100% - 12px));
}

.vision-tooltip.robotics {
  transform: none;
}

.vision-tooltip strong,
.vision-tooltip span {
  display: block;
}

.vision-tooltip strong {
  color: var(--tooltip-color);
  font-size: 13px;
  line-height: 1.25;
}

.vision-tooltip span {
  margin-top: 4px;
  color: rgba(220, 238, 255, 0.82);
  font-size: 12px;
  line-height: 1.45;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.vision-mobile-links {
  display: none;
}

@keyframes coreBreathe {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.985);
  }
  50% {
    opacity: 0.92;
    transform: scale(1.035);
  }
}

@keyframes flowRun {
  to {
    stroke-dashoffset: -100;
  }
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(var(--p-scale));
  }
  50% {
    transform: translate3d(18px, -24px, 0) scale(calc(var(--p-scale) * 1.14));
  }
}

@keyframes neuralPulse {
  0%,
  100% {
    opacity: 0.28;
    transform: scale(0.85);
  }
  48% {
    opacity: 0.9;
    transform: scale(1.28);
  }
}

@keyframes cognitiveWave {
  0%,
  100% {
    opacity: 0.12;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.42;
    transform: scale(1.05);
  }
}

@keyframes softwareScan {
  0%,
  100% {
    transform: translateY(-34%);
    opacity: 0.1;
  }
  50% {
    transform: translateY(34%);
    opacity: 0.58;
  }
}

@keyframes codeData {
  0%,
  100% {
    opacity: 0.12;
    transform: translateY(-12px) scaleY(0.7);
  }
  50% {
    opacity: 0.62;
    transform: translateY(14px) scaleY(1.18);
  }
}

@keyframes robotEnergy {
  0%,
  100% {
    opacity: 0.12;
    transform: scale(0.94);
  }
  50% {
    opacity: 0.48;
    transform: scale(1.08);
  }
}

@keyframes robotSweep {
  0%,
  100% {
    opacity: 0.1;
    transform: translateY(0) rotate(-8deg);
  }
  50% {
    opacity: 0.52;
    transform: translateY(150px) rotate(-8deg);
  }
}

@keyframes cityGrid {
  to {
    background-position: 26px 20px;
  }
}

@keyframes cityTwinkle {
  0%,
  100% {
    opacity: 0.16;
    transform: scale(0.7);
  }
  50% {
    opacity: 0.86;
    transform: scale(1.2);
  }
}

@keyframes orbitDash {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -220;
  }
}

@media (max-width: 820px) {
  .hotspots {
    display: none;
  }

  .flow-line {
    stroke-width: 3;
  }

  .particles span:nth-child(n + 19) {
    display: none;
  }

  .module-effect {
    opacity: 0.36;
  }

  .vision-tooltip-layer {
    display: none;
  }

  .vision-mobile-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 14px;
  }

  .vision-mobile-links a {
    display: grid;
    min-height: 54px;
    gap: 4px;
    padding: 11px 12px;
    border: 1px solid rgba(16, 42, 67, 0.16);
    border-radius: 8px;
    background: #ffffff;
    color: #102a43;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }

  .vision-mobile-links strong {
    font-size: 13px;
    line-height: 1.25;
  }

  .vision-mobile-links span {
    color: #5f6b7a;
    font-size: 12px;
    line-height: 1.4;
  }

  .vision-mobile-links a:focus-visible {
    outline: 3px solid #195f8f;
    outline-offset: 2px;
  }
}

@media (max-width: 560px) {
  .vision-stage {
    border-radius: 7px;
    transform: none;
  }

  .vision-image,
  .vision-overlay,
  .module-effects,
  .particles {
    transform: none;
  }

  .particles span:nth-child(n + 13) {
    display: none;
  }

  .feedback-orbit-layer {
    opacity: 0.45;
  }

  .vision-mobile-links {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vision-stage,
  .vision-image,
  .vision-overlay,
  .module-effects,
  .particles,
  .feedback-orbit-layer {
    transform: none !important;
    transition: none !important;
  }

  .particles,
  .flow-layer,
  .module-effects,
  .feedback-orbit-layer {
    display: none !important;
  }

  .core-ring,
  .flow-line,
  .particles span,
  .cognitive-node,
  .cognitive-pulse,
  .code-scanline,
  .code-stream,
  .robot-ring,
  .robot-sweep,
  .city-grid,
  .city-star,
  .orbit-ring,
  .orbit-spark {
    animation: none !important;
  }
}
</style>
