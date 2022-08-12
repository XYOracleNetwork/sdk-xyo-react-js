import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, CardProps, Divider, IconButton, Paper, PaperProps, Tooltip, useTheme } from '@mui/material'
import { toDecimalPrecision } from '@xylabs/decimal-precision'
import { FlexCol, FlexGrowCol } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'
import { Fragment } from 'react'

import { XyoCryptoAssetValue } from './lib'

export interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const theme = useTheme()
  const isLightMode = theme.palette.mode !== 'dark'

  const [tokenInfo] = useGetTokenData([asset])

  const tokenBarBgProps: PaperProps = {
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
      border: 'none',
    },
  }

  const formattedPrice = (price: string) => {
    const floatedPrice = parseFloat(price)
    return toDecimalPrecision(floatedPrice, 3)
  }

  return (
    <Card className="CryptoAsset-root" {...props}>
      <TokenSummary
        icon={tokenInfo.icon}
        symbol={asset}
        action={
          <IconButton sx={{ cursor: 'default' }}>
            <Tooltip title="The price of cryptos based on multiple inputs.">
              <HelpOutlineIcon />
            </Tooltip>
          </IconButton>
        }
      ></TokenSummary>
      <CardContent style={{ height: '100%' }}>
        <FlexCol alignItems="stretch" height="100%" justifyContent="flex-start">
          <FlexCol alignItems="stretch" justifyContent="flex-start">
            <Paper component={FlexGrowCol} elevation={0} alignItems="stretch" overflow="hidden">
              {Object.entries(priceInfo.value).map(([currency, price], index, arr) => (
                <Fragment key={currency}>
                  <TokenBar square text1={currency.toUpperCase()} text2={formattedPrice(price)} text2Props={{ title: price }} {...tokenBarBgProps} />
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
