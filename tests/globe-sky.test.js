import assert from 'node:assert/strict'
import test from 'node:test'
import { getSunPosition, vectorFromLatLng, rotateSunVector, daylightBrightness, createMeteor, meteorFrame, isMeteorVisible } from '../src/utils/globeSky.js'

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z
const angularDifference = (a, b) => ((a - b + 540) % 360) - 180

test('solar declination follows seasons and the subsolar point moves west with UTC', () => {
  for (const [date, latitude] of [['2026-03-20', 0], ['2026-06-21', 23.44], ['2026-12-21', -23.44]]) {
    const sun = getSunPosition(new Date(date + 'T12:00:00Z'))
    assert(Math.abs(sun.latitude - latitude) < 1)
    assert(Math.abs(Math.hypot(sun.vector.x, sun.vector.y, sun.vector.z) - 1) < 1e-12)
  }
  const noon = getSunPosition(new Date('2026-03-20T12:00:00Z'))
  const nextHour = getSunPosition(new Date('2026-03-20T13:00:00Z'))
  assert(Math.abs(angularDifference(nextHour.longitude, noon.longitude) + 15) < 0.02)
  const midnight = getSunPosition(new Date('2026-03-20T00:00:00Z'))
  assert(Math.abs(Math.abs(angularDifference(noon.longitude, midnight.longitude)) - 180) < 0.1)
})

test('the same instant gives the same sun from any local time zone, including leap days', () => {
  assert.deepEqual(getSunPosition(new Date('2026-10-14T12:00:00+08:00')), getSunPosition(new Date('2026-10-14T04:00:00Z')))
  const leapDay = getSunPosition(new Date('2028-02-29T12:00:00Z'))
  const nextDay = getSunPosition(new Date('2028-03-01T12:00:00Z'))
  assert(Math.abs(leapDay.latitude - nextDay.latitude) < 0.5)
  assert(Math.abs(angularDifference(leapDay.longitude, nextDay.longitude)) < 0.2)
})

test('daylight stays on geographic regions as the globe rotates', () => {
  const sun = getSunPosition(new Date('2026-03-20T04:00:00Z'))
  const hongKong = vectorFromLatLng(22.28, 114.17)
  const newYork = vectorFromLatLng(40.71, -74.01)
  assert(dot(hongKong, sun.vector) > 0.8)
  assert(dot(newYork, sun.vector) < -0.6)
  for (const rotation of [-180, -90, 0, 90, 180]) {
    for (const location of [hongKong, newYork]) {
      assert(Math.abs(dot(location, sun.vector) - dot(rotateSunVector(location, rotation), rotateSunVector(sun.vector, rotation))) < 1e-12)
    }
  }
  assert(daylightBrightness(1) > 2 * daylightBrightness(-1))
  assert(daylightBrightness(-1) > 0.3)
  let previous = 0
  for (let light = -1; light <= 1; light += 0.02) {
    const brightness = daylightBrightness(light)
    assert(brightness >= previous && brightness <= 1.06)
    previous = brightness
  }
})

test('occasional meteor trails fade in and out and work at narrow canvas sizes', () => {
  for (const width of [236, 420, 700]) {
    for (const random of [() => 0.25, () => 0.75]) {
      const meteor = createMeteor(1000, width, 340, random)
      assert.equal(meteorFrame(meteor, 999), null)
      assert.equal(meteorFrame(meteor, 1001 + meteor.duration), null)
      assert.equal(meteorFrame(meteor, 1000).opacity, 0)
      assert(Math.abs(meteorFrame(meteor, 1000 + meteor.duration).opacity) < 1e-12)
      const middle = meteorFrame(meteor, 1000 + meteor.duration / 2)
      assert(Math.abs(middle.opacity - 0.8) < 1e-12)
      assert(middle.x >= 0 && middle.x <= width && middle.y >= 0 && middle.y <= 340)
      assert(Math.abs(Math.hypot(middle.x - middle.tailX, middle.y - middle.tailY) - meteor.tail) < 1e-10)
    }
  }
})

test('the lucky notice requires a meteor in the visible sky, clear of the globe and clocks', () => {
  const scene = {
    viewport: { left: 0, right: 400, top: 0, bottom: 320 },
    sphere: { x: 200, y: 160, radius: 100 },
  }
  const sky = { x: 70, y: 50, tailX: 20, tailY: 30, opacity: 0.8 }
  assert.equal(isMeteorVisible(sky, scene), true)
  assert.equal(isMeteorVisible({ x: 220, y: 150, tailX: 180, tailY: 140, opacity: 0.8 }, scene), false)
  assert.equal(isMeteorVisible(sky, { ...scene, obstacles: [{ left: 0, right: 120, top: 0, bottom: 90 }] }), false)
  assert.equal(isMeteorVisible({ x: 145, y: 120, tailX: 10, tailY: 10, opacity: 0.8 }, scene), true)
})

test('the lucky notice is suppressed for faint, absent, and off-screen meteors', () => {
  const scene = {
    viewport: { left: 0, right: 236, top: 80, bottom: 320 },
    sphere: { x: 118, y: 164, radius: 84 },
  }
  const frame = { x: 70, y: 50, tailX: 20, tailY: 30, opacity: 0.8 }
  assert.equal(isMeteorVisible(frame, scene), false)
  assert.equal(isMeteorVisible(null, scene), false)
  assert.equal(isMeteorVisible({ ...frame, opacity: 0.1 }, { ...scene, viewport: { left: 0, right: 236, top: 0, bottom: 320 } }), false)
  assert.equal(isMeteorVisible(frame, { ...scene, viewport: { left: 0, right: 236, top: 400, bottom: 320 } }), false)
})
