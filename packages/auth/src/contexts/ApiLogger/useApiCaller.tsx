/* eslint-disable deprecation/deprecation */
import { AxiosLoggedError } from './ApiLoggerTypes'
import { useApiLogger } from './useApiLogger'

/** @deprecated use archivist-api to handle api call logging */
export interface InvokeApiConfig {
  call: () => Promise<unknown>
  // Future
  // showMeta: true
  // flattenData: true
}

/** @deprecated use archivist-api to handle api call logging */
const useApiCaller = () => {
  const { setApiCalls } = useApiLogger()

  const invoke = async ({ call }: InvokeApiConfig) => {
    try {
      const response = await call()
      return response
    } catch (e) {
      setApiCalls((prev) => {
        const axiosError = e as AxiosLoggedError
        axiosError.logged = new Date().toISOString()
        prev.unshift(axiosError)
        return [...prev]
      })
      throw e
    }
  }

  return { invoke }
}

export { useApiCaller }
