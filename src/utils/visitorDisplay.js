/**
 * Stable public VCN identifier contract (adopted 2026-09-05).
 *
 * VCN means "Visitor of CSMA Number". The Worker remains the source of truth
 * for the positive, globally increasing visitor_number; this module only
 * converts that number into its public, fixed-width representation.
 *
 * Layout (11 ASCII characters): VCN + BBBB + NNNN
 * - VCN: permanent prefix.
 * - BBBB: floor(visitor_number / 10,000), encoded as uppercase Base36
 *   (0-9, A-Z) and left-padded to four characters.
 * - NNNN: visitor_number modulo 10,000, written in decimal and left-padded
 *   to four digits.
 *
 * Examples: 22 -> VCN00000022; 9,999 -> VCN00009999;
 * 10,000 -> VCN00010000; 16,796,159,999 -> VCNZZZZ9999.
 * Supported visitor numbers are 1 through 16,796,159,999 inclusive.
 *
 * Dates are deliberately excluded so a returning visitor keeps the same
 * public number. Do not change the prefix, widths, radix, or interpretation
 * in place: a future format must be versioned so existing VCNs stay stable.
 */
const VCN_PREFIX = 'VCN'
const VCN_BUCKET_RADIX = 36
const VCN_BUCKET_WIDTH = 4
const VCN_SEQUENCE_WIDTH = 4
const VCN_BLOCK_SIZE = 10 ** VCN_SEQUENCE_WIDTH
const VCN_MAX_VISITOR_NUMBER = (VCN_BUCKET_RADIX ** VCN_BUCKET_WIDTH) * VCN_BLOCK_SIZE - 1

export const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'boolean') return null
  if (typeof value === 'string' && !value.trim()) return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export const toFiniteCoordinate = (value, min, max) => {
  const coordinate = toFiniteNumber(value)
  return coordinate !== null && coordinate >= min && coordinate <= max
    ? coordinate
    : null
}

export const formatStatCount = (value, fallback = 'Unavailable') => {
  const count = toFiniteNumber(value)
  return count !== null && count >= 0
    ? Math.trunc(count).toLocaleString('en-US')
    : fallback
}

export const formatVisitorNumber = (value, fallback = 'Unavailable') => {
  const visitorNumber = toFiniteNumber(value)
  const sequence = visitorNumber === null ? 0 : Math.trunc(visitorNumber)
  if (sequence < 1 || sequence > VCN_MAX_VISITOR_NUMBER) return fallback

  const bucket = Math.floor(sequence / VCN_BLOCK_SIZE)
  const bucketCode = bucket
    .toString(VCN_BUCKET_RADIX)
    .toUpperCase()
    .padStart(VCN_BUCKET_WIDTH, '0')
  const sequenceCode = String(sequence % VCN_BLOCK_SIZE).padStart(VCN_SEQUENCE_WIDTH, '0')
  return `${VCN_PREFIX}${bucketCode}${sequenceCode}`
}

export const isValidTimeZone = (timeZone) => {
  if (!timeZone) return false

  try {
    new Intl.DateTimeFormat('en', { timeZone }).format()
    return true
  } catch {
    return false
  }
}
