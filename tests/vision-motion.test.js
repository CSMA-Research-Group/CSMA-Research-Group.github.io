import assert from 'node:assert/strict'
import test from 'node:test'
import { createVisionOrbitState, advanceVisionOrbit } from '../src/utils/visionMotion.js'

const phaseDistance = (a, b) => Math.abs(((a - b + 540) % 360) - 180)

test('random orbit changes stay slow, continuous, and inside a small tilt range', () => {
  let seed = 7
  const random = () => ((seed = seed * 16807 % 2147483647) - 1) / 2147483646
  const state = createVisionOrbitState()
  const directions = new Set()
  for (let frame = 0; frame < 8000; frame += 1) {
    const previous = { ...state }
    advanceVisionOrbit(state, 0.05, random)
    assert(state.phase >= 0 && state.phase < 360)
    assert(Math.abs(state.speed) <= 15)
    assert(state.tilt >= -16 && state.tilt <= -4)
    assert(phaseDistance(state.phase, previous.phase) <= 0.750001)
    assert(Math.abs(state.speed - previous.speed) < 0.4)
    assert(Math.abs(state.tilt - previous.tilt) < 0.12)
    directions.add(Math.sign(state.speed))
  }
  assert(directions.has(-1) && directions.has(1))
})

test('reversals ease through zero and long frame gaps cannot jump the orbit', () => {
  const state = createVisionOrbitState()
  advanceVisionOrbit(state, 0.05, () => 0)
  assert(state.targetSpeed < 0 && state.speed > 0)
  for (let frame = 0; frame < 160; frame += 1) advanceVisionOrbit(state, 0.05, () => 0)
  assert(state.speed < 0)
  const paused = { ...state }
  advanceVisionOrbit(state, 0, () => 0)
  assert.deepEqual(state, paused)
  advanceVisionOrbit(state, 600, () => 0)
  assert(phaseDistance(state.phase, paused.phase) <= 1.500001)
})
