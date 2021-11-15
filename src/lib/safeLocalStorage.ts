import { Log } from '@xylabs/sdk-js'

export const getLocalStorageObject = <T>(key: string, log?: Log): T => {
  let result = {} as T
  try {
    result = JSON.parse(localStorage.getItem(key) ?? '{}') as T
  } catch (e) {
    log?.error('getLocalStorageObject', e)
  }
  return result
}

export const setLocalStorageObject = <T>(key: string, value: T, log?: Log) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    log?.error('setLocalStorageObject', e)
  }
}
