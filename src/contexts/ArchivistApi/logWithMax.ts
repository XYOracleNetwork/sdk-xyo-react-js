export const logWithMax = <T>(log: T[], item: T, max: number) => {
  if (max > 0) {
    log.unshift(item)
    while (log.length > max) {
      log.pop()
    }
  }
  return log
}
