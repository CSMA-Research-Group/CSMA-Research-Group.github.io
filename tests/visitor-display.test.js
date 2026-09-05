import assert from 'node:assert/strict'
import test from 'node:test'
import {
  formatStatCount,
  formatVisitorNumber,
  isValidTimeZone,
  toFiniteCoordinate,
  toFiniteNumber,
} from '../src/utils/visitorDisplay.js'

test('empty statistics never become a synthetic zero', () => {
  assert.equal(toFiniteNumber(null), null)
  assert.equal(toFiniteNumber(undefined), null)
  assert.equal(toFiniteNumber(''), null)
  assert.equal(toFiniteNumber('   '), null)
  assert.equal(toFiniteNumber(false), null)
  assert.equal(toFiniteNumber(true), null)
  assert.equal(formatStatCount(null), 'Unavailable')
  assert.equal(formatVisitorNumber(null), 'Unavailable')
  assert.equal(formatVisitorNumber(0), 'Unavailable')
})

test('coordinates require finite values inside geographic bounds', () => {
  assert.equal(toFiniteCoordinate('29.5', -90, 90), 29.5)
  assert.equal(toFiniteCoordinate(90, -90, 90), 90)
  assert.equal(toFiniteCoordinate(91, -90, 90), null)
  assert.equal(toFiniteCoordinate(-181, -180, 180), null)
  assert.equal(toFiniteCoordinate(false, -90, 90), null)
})

test('real zero totals and positive visitor numbers are formatted correctly', () => {
  assert.equal(formatStatCount(0), '0')
  assert.equal(formatStatCount(12345), '12,345')
  assert.equal(formatVisitorNumber(12345), '#12,345')
})

test('IANA timezone validation rejects unusable API values', () => {
  assert.equal(isValidTimeZone('Asia/Shanghai'), true)
  assert.equal(isValidTimeZone('America/Los_Angeles'), true)
  assert.equal(isValidTimeZone('Not/A_Timezone'), false)
  assert.equal(isValidTimeZone(''), false)
})
