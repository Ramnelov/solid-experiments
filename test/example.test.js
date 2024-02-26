import { test, assert } from 'vitest'

test('simple arithmetic', () => {
  assert.strictEqual(1 + 1, 2)
})

test('async test', async () => {
  const result = await new Promise(resolve => setTimeout(() => resolve('done'), 1000))
  assert.strictEqual(result, 'done')
})