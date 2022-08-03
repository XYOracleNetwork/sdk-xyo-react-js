import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, Grid, GridProps, IconButton, Tooltip } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'

import { XyoCryptoAssetValue } from './lib'

interface CryptoAssetProps extends GridProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const [tokenInfo] = useGetTokenData([asset])
  const [currency, price] = Object.entries(priceInfo.value)[0]
  console.log(currency, price)

  return (
    <Grid item xs={12} md={6} lg={4} xl={3} spacing={2} {...props}>
      <Card>
        <CardContent>
          <FlexGrowRow>
            <TokenSummary icon={tokenInfo.icon} symbol={asset}>
              <IconButton sx={{ mb: 3 }}>
                <Tooltip title="The meta price takes into account the price of XYO against other crypto currencies and derives a meta-price.">
                  <HelpOutlineIcon />
                </Tooltip>
              </IconButton>
            </TokenSummary>
          </FlexGrowRow>
          <TokenBar text1={price} text2={currency} />
        </CardContent>
      </Card>
    </Grid>
  )
}
