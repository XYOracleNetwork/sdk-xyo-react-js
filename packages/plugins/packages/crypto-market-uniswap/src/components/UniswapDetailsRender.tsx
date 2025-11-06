import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { isAnyPayload } from '@xyo-network/payload-model'
import type { PayloadDetailsListRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import type { UniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

import { UniswapPairsCardView } from './Cards/index.ts'
import { UniswapPairsTableView } from './Table/index.ts'

export const UniswapDetailsRender: React.FC<PayloadDetailsListRenderProps & FlexBoxProps> = ({ listMode, ...props }) => {
  const { payload } = props
  if (!isAnyPayload(payload)) {
    return <PayloadDataMissing alertBody="No payload found in details render." />
  }
  const uniswapPayload = payload as UniswapCryptoMarketPayload

  if (uniswapPayload?.pairs.length === 0) {
    return <PayloadDataMissing alertBody="Payload is missing valid Uniswap Pairs." />
  }

  return (
    <>
      {listMode === 'table'
        ? <UniswapPairsTableView {...props} />
        : <UniswapPairsCardView {...props} />}
    </>
  )
}
