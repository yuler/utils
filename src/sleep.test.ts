import sleep from './sleep'

const mockCallback = jest.fn()

it('sleep', async () => {
  const pre = Date.now()
  await sleep(1000, mockCallback)
  const diff = Date.now() - pre
  expect(diff).toBeGreaterThanOrEqual(1000)
  expect(diff).toBeLessThanOrEqual(1050)
  expect(mockCallback.mock.calls.length).toBe(1)
})
