import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { Card, CardContent, CardProps, Divider, IconButton, Paper, PaperProps, Tooltip, useTheme } from '@mui/material'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import { TokenBar, TokenSummary, useGetTokenData } from '@xyo-network/react-shared'
import { Fragment } from 'react'

import { XyoCryptoAssetValue } from './lib'

interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo: XyoCryptoAssetValue
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({ asset, priceInfo, ...props }) => {
  const theme = useTheme()
  const isLightMode = theme.palette.mode !== 'dark'

  const [tokenInfo] = useGetTokenData([asset])

  const imgBgProps: PaperProps = {
    elevation: isLightMode ? 1 : 3,
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
    },
    variant: 'elevation',
  }

  const tokenBarBgProps: PaperProps = {
    sx: {
      bgcolor: isLightMode ? '#F6F5FA' : 'inherit',
      border: 'none',
    },
  }

  return (
    <Card className="CryptoAsset-root" {...props}>
      <CardContent style={{ height: '100%' }}>
        <FlexCol alignItems="stretch" height="100%" justifyContent="flex-start">
          <FlexRow>
            <TokenSummary icon={tokenInfo.icon} symbol={asset} imgBgProps={imgBgProps}>
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
                  <TokenBar
                    square
                    text1={currency.toUpperCase()}
                    text2={parseFloat(price).toFixed(6)}
                    text2Props={{ title: price }}
                    {...tokenBarBgProps}
                  />
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
