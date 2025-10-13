import { assertEx } from '@xylabs/assert'
import { usePromise } from '@xylabs/react-promise'
import { isDefined } from '@xylabs/typeof'
import type { Payload } from '@xyo-network/payload-model'
import axios from 'axios'
import { useState } from 'react'

export const useApiCall = <T extends Payload = Payload>(url?: string, idFunction?: (payload?: Payload) => boolean) => {
  const [retry, setRetry] = useState(1)

  const [response, error, state] = usePromise<T>(async () => {
    if (isDefined(url) && retry > 0) {
      const response = await axios(url)
      const json = response.data
      if (idFunction) {
        const assertedValue = assertEx(idFunction(json) ? json : null, () => 'Api Response did not match expected format')
        return assertedValue
      }
      return json
    }
  }, [idFunction, url, retry])

  return [response, error, state, () => setRetry(retry + 1)] as const
}
