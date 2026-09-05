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

test('real zero totals and the stable VCN identifier contract are formatted correctly', () => {
  assert.equal(formatStatCount(0), '0')
  assert.equal(formatStatCount(12345), '12,345')
  assert.equal(formatVisitorNumber(22), 'VCN00000022')
  assert.equal(formatVisitorNumber(9999), 'VCN00009999')
  assert.equal(formatVisitorNumber(10000), 'VCN00010000')
  assert.equal(formatVisitorNumber(359999), 'VCN000Z9999')
  assert.equal(formatVisitorNumber(360000), 'VCN00100000')
  assert.equal(formatVisitorNumber(9999999), 'VCN00RR9999')
  assert.equal(formatVisitorNumber(466559999), 'VCN0ZZZ9999')
  assert.equal(formatVisitorNumber(466560000), 'VCN10000000')
  assert.equal(formatVisitorNumber(16796159999), 'VCNZZZZ9999')
  assert.equal(formatVisitorNumber(16796160000), 'Unavailable')
})

test('IANA timezone validation rejects unusable API values', () => {
  assert.equal(isValidTimeZone('Asia/Shanghai'), true)
  assert.equal(isValidTimeZone('America/Los_Angeles'), true)
  assert.equal(isValidTimeZone('Not/A_Timezone'), false)
  assert.equal(isValidTimeZone(''), false)
})
