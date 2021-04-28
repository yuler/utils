export default function sleep(ms: number, callback?: () => void): Promise<void> {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
