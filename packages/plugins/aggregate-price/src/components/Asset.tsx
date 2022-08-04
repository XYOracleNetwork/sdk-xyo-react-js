import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, CardProps, IconButton, Paper, Tooltip } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'

import { XyoCryptoAssetValue } from './lib'

interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const [tokenInfo] = useGetTokenData([asset])

  return (
    <Card {...props}>
      <CardContent style={{ height: '100%' }}>
        <FlexCol alignItems="stretch" height="100%" justifyItems="flex-start">
          <FlexRow>
            <TokenSummary icon={tokenInfo.icon} symbol={asset}>
              <IconButton sx={{ mb: 3 }}>
                <Tooltip title="The meta price takes into account the price of XYO against other crypto currencies and derives a meta-price.">
                  <HelpOutlineIcon />
                </Tooltip>
              </IconButton>
            </TokenSummary>
          </FlexRow>
          <FlexGrowCol alignItems="stretch" justifyContent="flex-start">
            <Paper elevation={0} style={{ height: '100%', overflow: 'hidden', width: '100%' }}>
              {Object.entries(priceInfo.value).map(([price, currency]) => (
                <TokenBar square key={currency} text1={price} text2={currency} />
              ))}
            </Paper>
          </FlexGrowCol>
        </FlexCol>
      </CardContent>
    </Card>
  )
}
