import { Log } from '@xylabs/sdk-js'

export const getSessionStorageObject = (key: string, log?: Log) => {
  let result = {}
  try {
    result = JSON.parse(sessionStorage.getItem(key) ?? '{}')
  } catch (e) {
    log?.error('getSessionStorageObject', e)
  }
  return result
}

export const setSessionStorageObject = (key: string, value: Record<string, unknown>, log?: Log) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    log?.error('setSessionStorageObject', e)
  }
}
