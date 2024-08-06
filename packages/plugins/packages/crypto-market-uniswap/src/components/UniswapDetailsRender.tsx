import { FlexBoxProps } from '@xylabs/react-flexbox'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import { UniswapCryptoMarketPayload } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React from 'react'

import { UniswapPairsCardView } from './Cards/index.ts'
import { UniswapPairsTableView } from './Table/index.ts'

export const UniswapDetailsRender: React.FC<PayloadDetailsRenderProps & FlexBoxProps> = ({ listMode, ...props }) => {
  const { payload } = props
  const uniswapPayload = payload ? (payload as UniswapCryptoMarketPayload) : undefined

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
