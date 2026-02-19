import type { UsePromiseState } from '@xylabs/react-promise'
import {
  assertEx, isDefined, isDefinedNotNull,
} from '@xylabs/sdk-js'
import type { CryptoMarketAssetPayload } from '@xyo-network/crypto-asset-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { JSONPath } from 'jsonpath-plus'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { isPriceWidgetConfigLike, type PriceWidgetConfigFields } from '../models/index.ts'
import { useApiCall } from './useApiCall.ts'

export interface ParsedPriceWidgetResult extends PriceWidgetConfigFields {
  error?: Error
  name?: string
  price?: string
  relativeTime?: string | null
  result?: CryptoMarketAssetPayload
  retry?: () => void
  state?: UsePromiseState
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
    () => (payload ? assertEx(isPriceWidgetConfigLike(payload) ? payload : null, () => 'Invalid payload') : undefined),
    [payload],
  )

  const [result, error, state, retry] = useApiCall<CryptoMarketAssetPayload>(priceWidgetConfig?.source)

  const ret: ParsedPriceWidgetResult = useMemo(() => {
    if (!result) return {} as ParsedPriceWidgetResult
    const normalizedTimestamp = normalizeTimestamp(result?.timestamp)
    let price: string = 'none'
    for (const path of priceWidgetConfig?.priceJsonPaths || []) {
      const foundPrice = JSONPath({ json: result, path })[0]
      if (isDefinedNotNull(foundPrice)) {
        price = foundPrice
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
          state,
          timestamp: normalizedTimestamp,
        })
      : ({} as ParsedPriceWidgetResult)
  }, [error, priceWidgetConfig, result, retry])

  return ret
}
