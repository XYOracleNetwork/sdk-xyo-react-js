import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, CardProps, Divider, IconButton, Paper, Tooltip } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { useAppSettings } from '@xyo-network/react-app-settings'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'
import { Fragment } from 'react'

import { XyoCryptoAssetValue } from './lib'

interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const [tokenInfo] = useGetTokenData([asset])
  const { darkMode } = useAppSettings()

  return (
    <Card className="CryptoAsset-root" {...props}>
      <CardContent style={{ height: '100%' }}>
        <FlexCol alignItems="stretch" height="100%" justifyContent="flex-start">
          <FlexRow>
            <TokenSummary icon={tokenInfo.icon} symbol={asset} imgBgColor={darkMode ? '' : '#F6F5FA'}>
              <IconButton sx={{ mb: 3 }}>
                <Tooltip title="The price of cryptos based on multiple inputs.">
                  <HelpOutlineIcon />
                </Tooltip>
              </IconButton>
            </TokenSummary>
          </FlexRow>
          <FlexCol alignItems="stretch" justifyContent="flex-start">
            <Paper component={FlexGrowCol} elevation={0} alignItems="stretch" overflow="hidden">
              {Object.entries(priceInfo.value).map(([currency, price], index, arr) => (
                <Fragment key={currency}>
                  <TokenBar square text1={currency.toUpperCase()} text2={price} sx={{ bgcolor: darkMode ? 'inherit' : '#F6F5FA' }} />
                  {/* hide the last divider */}
                  {index !== arr.length - 1 ? <Divider flexItem /> : null}
                </Fragment>
              ))}
            </Paper>
          </FlexCol>
        </FlexCol>
      </CardContent>
    </Card>
  )
}
