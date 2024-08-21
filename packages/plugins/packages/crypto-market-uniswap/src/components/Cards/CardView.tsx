import {
  Card, CardContent, Grid,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Payload } from '@xyo-network/payload-model'
import type { UniswapCryptoMarketPayload, UniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import React, { useState } from 'react'

import { CardViewType } from './CardViewType.ts'
import { DynamicTokenComparison } from './DynamicTokenComparison.tsx'
import { StaticTokenComparison } from './StaticTokenComparison.tsx'

interface UniswapPairsCardsProps extends FlexBoxProps {
  payload?: Payload
}

export const UniswapPairsCardView: React.FC<UniswapPairsCardsProps> = ({
  payload, ...props
}) => {
  const uniswapPayload = payload ? (payload as UniswapCryptoMarketPayload) : undefined
  const [cardViewStyle] = useState(CardViewType.Static)

  return (
    <FlexCol alignItems="stretch" justifyContent="flex-start" {...props}>
      {/* Bring back once Dynamic view is more mature */}
      {/* <CardViewToggle cardViewStyle={cardViewStyle} setCardViewStyle={setCardViewStyle} /> */}
      <Grid container spacing={1}>
        {uniswapPayload?.pairs.map((pair: UniswapCryptoPair, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card style={{ width: '100%' }}>
              <CardContent>
                {cardViewStyle == CardViewType.Static
                  ? <StaticTokenComparison tokenPayload={pair} />
                  : <DynamicTokenComparison tokenPayload={pair} />}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </FlexCol>
  )
}
