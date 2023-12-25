export async function sleep(
  ms: number,
  callback?: Awaited<any>,
): Promise<void> {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
