import { assertEx } from '@xylabs/assert'
import { isDefined } from '@xylabs/typeof'
import type { CoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { JSONPath } from 'jsonpath-plus'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { isPriceWidgetConfig, type PriceWidgetConfig } from '../models/index.ts'
import { useApiCall } from './useApiCall.ts'

export interface ParsedPriceWidgetResult extends PriceWidgetConfig {
  error?: Error
  name?: string
  price?: string
  relativeTime?: string | null
  result?: CoingeckoCryptoMarketPayload
  retry?: () => void
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

export const useParsePriceWidgetConfig = (payload?: Payload) => {
  const priceWidgetConfig = useMemo(
    () => (payload ? assertEx(isPriceWidgetConfig(payload) ? (payload as PriceWidgetConfig) : null, () => 'Invalid payload') : undefined),
    [payload],
  )

  const [result, error, , retry] = useApiCall<CoingeckoCryptoMarketPayload>(priceWidgetConfig?.source)

  const ret: ParsedPriceWidgetResult = useMemo(() => {
    if (!result) return {} as ParsedPriceWidgetResult
    const normalizedTimestamp = normalizeTimestamp(result?.timestamp)
    let price: string = 'none'
    for (const path of priceWidgetConfig?.priceJsonPaths || []) {
      price = JSONPath({ json: result, path })[0]
      if (isDefined(price)) {
        break
      }
    }

    return isDefined(result) && priceWidgetConfig && isDefined(normalizedTimestamp)
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
        })
      : ({} as ParsedPriceWidgetResult)
  }, [error, priceWidgetConfig, result, retry])

  return ret
}
