/** @deprecated if you believe this should not be the case, open a ticket: https://github.com/XYOracleNetwork/sdk-xyo-react-js/issues */
export const logWithMax = <T>(log: T[], item: T, max: number) => {
  if (max > 0) {
    log.unshift(item)
    while (log.length > max) {
      log.pop()
    }
  }
  return log
}
