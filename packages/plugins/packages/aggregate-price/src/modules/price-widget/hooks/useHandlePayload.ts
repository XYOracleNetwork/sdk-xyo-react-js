import { assertEx } from '@xylabs/assert'
import { isDefined } from '@xylabs/typeof'
import type { CoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { JSONPath } from 'jsonpath-plus'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { isPriceWidgetConfig, type PriceWidgetConfig } from '../models/index.ts'
import { useApiCall } from './useApiCall.ts'

export interface HandlePayloadResult extends PriceWidgetConfig {
  error?: Error
  name?: string
  price?: string
  relativeTime?: string
  result?: CoingeckoCryptoMarketPayload
  retry: () => void
  timestamp?: number
}

const normalizeTimestamp = (timestamp?: number | string) => {
  switch (typeof timestamp) {
    case 'string': {
      return DateTime.fromISO(timestamp).toMillis()
    }
    case 'number': {
      return timestamp
    }
    default: {
      return
    }
  }
}

export const useHandlePayload = (payload?: Payload) => {
  const priceWidgetConfig = useMemo(
    () => (payload ? assertEx(isPriceWidgetConfig(payload) ? (payload as PriceWidgetConfig) : null, () => 'Invalid payload') : undefined),
    [payload],
  )

  const [result, error, , retry] = useApiCall<CoingeckoCryptoMarketPayload>(priceWidgetConfig?.source)

  return useMemo(() => {
    if (!result) return {} as HandlePayloadResult
    const normalizedTimestamp = normalizeTimestamp(result?.timestamp)
    let price: string = 'none'
    for (const path of priceWidgetConfig?.priceJsonPaths || []) {
      price = JSONPath({ json: result, path })[0]
      if (isDefined(price)) {
        break
      }
    }

    return result && priceWidgetConfig && normalizedTimestamp
      ? ({
          ...priceWidgetConfig,
          // Custom Fields for easier ui rendering
          error,
          name: priceWidgetConfig.currency.toUpperCase(),
          price,
          relativeTime: DateTime.fromMillis(normalizedTimestamp).toRelative(),
          result,
          retry,
          timestamp: normalizedTimestamp,
        } as HandlePayloadResult)
      : ({} as HandlePayloadResult)
  }, [error, priceWidgetConfig, result, retry])
}
