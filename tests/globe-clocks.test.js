import assert from 'node:assert/strict'
import test from 'node:test'
import { worldClockCities, worldClockCorners } from '../src/data/worldClocks.js'
import { createCityClockFormatter, createWorldClockRotation, localClockBounds, clampClockPosition, nextClockPosition } from '../src/utils/globeClocks.js'

const clockAt = (city, instant) => createCityClockFormatter(
  worldClockCities.find(item => item.id === city).timeZone,
)(new Date(instant))

test('the initial four clocks include Hong Kong and cover seasonal UTC offsets', () => {
  assert.equal(worldClockCities.length, 20)
  assert.equal(new Set(worldClockCities.map(city => city.id)).size, 20)
  assert.equal(worldClockCities[0].id, 'hong-kong')
  assert(!worldClockCities.some(city => city.id === 'shanghai'))
  const dates = ['2026-01-15T12:34:00Z', '2026-07-15T12:34:00Z']
  const expected = [
    [['20:34', 'UTC+8'], ['23:34', 'UTC+11'], ['12:34', 'UTC'], ['07:34', 'UTC-5']],
    [['20:34', 'UTC+8'], ['22:34', 'UTC+10'], ['13:34', 'UTC+1'], ['08:34', 'UTC-4']],
  ]
  dates.forEach((date, index) => {
    const values = createWorldClockRotation(worldClockCities, worldClockCorners)(new Date(date))
    assert.deepEqual(values.map(value => [value.time, value.offset]), expected[index])
    assert.deepEqual(values.map(value => value.corner), worldClockCorners)
    assert.equal(new Set(values.map(value => value.offset)).size, 4)
  })
})

test('minute rotation visits every city without repeated UTC offsets or consecutive cities', () => {
  for (const date of ['2026-01-15T12:00:00Z', '2026-07-15T12:00:00Z', '2026-03-29T00:58:00Z']) {
    const rotate = createWorldClockRotation(worldClockCities, worldClockCorners)
    const start = Date.parse(date)
    const seen = new Set()
    let previous = []
    for (let minute = 0; minute < 20; minute += 1) {
      const clocks = rotate(new Date(start + minute * 60000))
      assert.equal(clocks.length, 4)
      assert.equal(new Set(clocks.map(clock => clock.offset)).size, 4)
      const ids = clocks.map(clock => clock.id)
      assert(ids.every(id => !previous.includes(id)))
      assert.deepEqual(rotate(new Date(start + minute * 60000 + 45000)).map(clock => clock.id), ids)
      clocks.forEach(clock => seen.add(clock.id))
      previous = ids
    }
    assert.equal(seen.size, 20)
  }
})

test('resuming after a long pause refreshes current times and retains fractional UTC offsets', () => {
  const rotate = createWorldClockRotation(worldClockCities, worldClockCorners)
  const before = rotate(new Date('2026-01-15T12:00:00Z'))
  const after = rotate(new Date('2026-07-15T22:07:00Z'))
  assert(after.every(clock => !before.some(old => old.id === clock.id)))
  for (const clock of after) {
    const expected = clockAt(clock.id, '2026-07-15T22:07:00Z')
    assert.equal(clock.time, expected.time)
    assert.equal(clock.date, expected.date)
    assert.equal(clock.offset, expected.offset)
  }
  assert.equal(clockAt('mumbai', '2026-07-15T12:34:00Z').time, '18:04')
  assert.equal(clockAt('mumbai', '2026-07-15T12:34:00Z').offset, 'UTC+5:30')
})

test('time and offset change together at northern and southern daylight-saving boundaries', () => {
  const cases = [
    ['london', '2026-03-29T00:59:00Z', '2026-03-29T01:00:00Z', '00:59', '02:00', 'UTC', 'UTC+1'],
    ['new-york', '2026-03-08T06:59:00Z', '2026-03-08T07:00:00Z', '01:59', '03:00', 'UTC-5', 'UTC-4'],
    ['sydney', '2026-04-04T15:59:00Z', '2026-04-04T16:00:00Z', '02:59', '02:00', 'UTC+11', 'UTC+10'],
  ]
  for (const [city, before, after, beforeTime, afterTime, beforeOffset, afterOffset] of cases) {
    assert.equal(clockAt(city, before).time, beforeTime)
    assert.equal(clockAt(city, after).time, afterTime)
    assert.equal(clockAt(city, before).offset, beforeOffset)
    assert.equal(clockAt(city, after).offset, afterOffset)
  }
})

test('city dates roll over independently and midnight uses 00 rather than 24', () => {
  const instant = '2026-12-31T16:00:00Z'
  assert.equal(clockAt('hong-kong', instant).time, '00:00')
  assert.equal(clockAt('hong-kong', instant).date, '01 Jan')
  assert.equal(clockAt('sydney', instant).date, '01 Jan')
  assert.equal(clockAt('london', instant).date, '31 Dec')
  assert.equal(clockAt('new-york', instant).date, '31 Dec')
})

test('random local-time paths remain inside the frame and clear all corner clocks after resizing', () => {
  let seed = 7
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  let current = { x: 600, y: 250 }
  for (const [width, height] of [[700, 340], [420, 320], [236, 340]]) {
    const chipWidth = Math.min(204, width - 24)
    const chipHeight = 44
    const cornerHeight = 64
    const bounds = localClockBounds(width, height, chipWidth, chipHeight, cornerHeight)
    current = clampClockPosition(current, bounds)
    for (let move = 0; move < 50; move += 1) {
      const next = nextClockPosition(bounds, current, random)
      for (const progress of [0, 0.25, 0.5, 0.75, 1]) {
        const x = current.x + (next.x - current.x) * progress
        const y = current.y + (next.y - current.y) * progress
        assert(x >= 12 && x + chipWidth <= width - 12)
        assert(y >= cornerHeight + 24)
        assert(y + chipHeight <= height - cornerHeight - 24)
      }
      current = next
    }
  }
})
