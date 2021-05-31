import { Log } from '@xyo-network/sdk-xyo-js'

export const getSessionStorageObject = (key: string, log?: Log) => {
  let result = {}
  try {
    result = JSON.parse(sessionStorage.getItem(key) ?? '{}')
  } catch (e) {
    log?.error('getSessionStorageObject', e)
  }
  return result
}

export const setSessionStorageObject = (key: string, value: Record<string, any>, log?: Log) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    log?.error('setSessionStorageObject', e)
  }
}
