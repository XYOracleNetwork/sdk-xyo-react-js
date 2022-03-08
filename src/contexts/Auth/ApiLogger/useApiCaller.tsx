import { AxiosLoggedError } from './ApiLoggerTypes'
import { useApiLogger } from './useApiLogger'

export interface InvokeApiConfig {
  call: () => Promise<object>
  // Future
  // showMeta: true
  // flattenData: true
}

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
