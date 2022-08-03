import { Card, CardContent, Grid } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { XyoUniswapCryptoMarketPayload, XyoUniswapCryptoPair } from '@xyo-network/uniswap-crypto-market-payload-plugin'
import { useState } from 'react'

import { CardViewToggle } from './CardViewToggle'
import { CardViewType } from './CardViewType'
import { DynamicTokenComparison } from './DynamicTokenComparison'
import { StaticTokenComparison } from './StaticTokenComparison'
import { TokenComparisonWrapper } from './TokenComparisonWrapper'

interface UniswapPairsCardsProps {
  payload?: XyoPayload
}

export const UniswapPairsCardView: React.FC<UniswapPairsCardsProps> = ({ payload }) => {
  const uniswapPayload = payload ? (payload as XyoUniswapCryptoMarketPayload) : undefined
  const [cardViewStyle, setCardViewStyle] = useState(CardViewType.Static)

  return (
    <FlexGrowCol alignItems="stretch" justifyContent="start">
      <Grid container spacing={2}>
        <CardViewToggle cardViewStyle={cardViewStyle} setCardViewStyle={setCardViewStyle} />
        {uniswapPayload?.pairs.map((pair: XyoUniswapCryptoPair, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card style={{ width: '100%' }}>
              <CardContent>
                {cardViewStyle == CardViewType.Static ? (
                  <TokenComparisonWrapper>
                    <StaticTokenComparison tokenPayload={pair} />
                  </TokenComparisonWrapper>
                ) : (
                  <TokenComparisonWrapper>
                    <DynamicTokenComparison tokenPayload={pair} />
                  </TokenComparisonWrapper>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </FlexGrowCol>
  )
}
