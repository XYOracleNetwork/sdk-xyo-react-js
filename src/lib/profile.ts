interface ProfileResult {
  endTime: number
  name: string
  startTime: number
}

let logProfiling = false

export const enableProfileLogging = (enabled: boolean) => {
  logProfiling = enabled
}

export const profileResults: Array<ProfileResult> = []

export const profileBlock = async (name: string, closure: () => Promise<unknown>) => {
  const startTime = Date.now()
  await closure()
  const endTime = Date.now()
  profileResults.push({ endTime, name, startTime })
  if (logProfiling) {
    console.log(`Timed ${name} [${endTime - startTime}ms]`)
  }
}
