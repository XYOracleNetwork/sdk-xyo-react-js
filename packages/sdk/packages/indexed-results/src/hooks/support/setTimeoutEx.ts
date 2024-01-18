export interface TimeoutInfo {
  delay: number
  func: () => void
}

let timeouts: TimeoutInfo[] = []

const timerFunc = () => {
  if (timeouts.length > 0) {
    setTimeout(timerFunc, 100)
  }
  const firing = timeouts.filter((timeout) => timeout.delay <= 100)
  for (const timeout of firing) {
    timeout.func()
  }
  const notFiring = timeouts.filter((timeout) => timeout.delay > 100)
  timeouts = notFiring.map((timeout) => ({ delay: timeout.delay - 100, func: timeout.func }))
}

export const setTimeoutEx = (func: () => void, delay: number) => {
  if (timeouts.length === 0) {
    setTimeout(timerFunc, 100)
  }
  timeouts.push({ delay, func })
}
