export const logWithMax = <T>(log: T[], item: T, max: number) => {
  log.unshift(item)
  while (log.length > max) {
    log.pop()
  }
  return log
}
