export const createVisionOrbitState = () => ({
  phase: 0,
  speed: 10,
  targetSpeed: 10,
  tilt: -10,
  targetTilt: -10,
  changeIn: 0,
})

// Ease toward random speed/direction and a small tilt. Cap long frame gaps so
// resuming a hidden tab cannot jump the light around the orbit.
export const advanceVisionOrbit = (state, elapsedSeconds, random = Math.random) => {
  const dt = Math.min(0.1, Math.max(0, elapsedSeconds))
  if (!dt) return state
  state.changeIn -= dt
  if (state.changeIn <= 0) {
    state.targetSpeed = (random() < 0.5 ? -1 : 1) * (9 + random() * 6)
    state.targetTilt = -16 + random() * 12
    state.changeIn = 12 + random() * 10
  }
  state.speed += (state.targetSpeed - state.speed) * (1 - Math.exp(-dt / 3.8))
  state.tilt += (state.targetTilt - state.tilt) * (1 - Math.exp(-dt / 5.5))
  state.phase = ((state.phase + state.speed * dt) % 360 + 360) % 360
  return state
}
