import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, CardProps, IconButton, Tooltip } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'

import { XyoCryptoAssetValue } from './lib'

interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const [tokenInfo] = useGetTokenData([asset])

  return (
    <Card style={{ height: '100%' }} {...props}>
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
        {Object.entries(priceInfo.value).map(([price, currency]) => (
          <TokenBar square key={currency} text1={price} text2={currency} />
        ))}
      </CardContent>
    </Card>
  )
}
