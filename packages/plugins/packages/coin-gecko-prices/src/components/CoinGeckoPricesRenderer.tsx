import type { CoingeckoCryptoMarketPayload } from '@xyo-network/coingecko-crypto-market-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import { CryptoAssetRenderer } from '@xyo-network/react-aggregate-price-plugin'
import type { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { useCoinGeckoToAssetPriceDiviner } from '../hooks/index.ts'

export interface CoinGeckoPricesRendererProps extends PayloadDetailsRenderProps {
  payload?: Payload
}

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

export const CoinGeckoPricesRenderer: React.FC<CoinGeckoPricesRendererProps> = ({ payload, ...props }) => {
  const coinGeckoPricesPayload = payload ? (payload as CoingeckoCryptoMarketPayload) : undefined

  const mappedCoinGeckoPricesPayload = useCoinGeckoToAssetPriceDiviner(coinGeckoPricesPayload)

  if (isEmpty(coinGeckoPricesPayload?.assets)) {
    return <PayloadDataMissing alertBody="Payload is missing valid asset prices" />
  }

  return <CryptoAssetRenderer payload={mappedCoinGeckoPricesPayload} {...props} />
}
