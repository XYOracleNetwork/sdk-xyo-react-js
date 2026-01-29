import type { CardProps, PaperProps } from '@mui/material'
import {
  Card, CardContent, Divider, Link, Paper,
} from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { useIsDark } from '@xylabs/react-theme'
import { toDecimalPrecision } from '@xylabs/sdk-js'
import type { AssetInfo } from '@xyo-network/crypto-asset-payload-plugin'
import {
  getTokenData,
  TokenBar, TokenSummary,
} from '@xyo-network/react-shared'
import React, { Fragment } from 'react'

export interface CryptoAssetProps extends CardProps {
  asset: string
  priceInfo?: AssetInfo
}

export const CryptoAsset: React.FC<CryptoAssetProps> = ({
  asset, priceInfo, ...props
}) => {
  const isDarkMode = useIsDark()

  const [tokenInfo] = getTokenData([asset])

  const tokenBarBgProps: PaperProps = {
    sx: {
      bgcolor: isDarkMode ? 'inherit' : '#F6F5FA',
      border: 'none',
    },
  }

  const formattedPrice = (price: string) => {
    const floatedPrice = Number.parseFloat(price)
    return toDecimalPrecision(floatedPrice, 3)
  }

  return (
    <Card className="CryptoAsset-root" {...props}>
      <TokenSummary
        icon={tokenInfo.icon}
        symbol={asset}
        symbolElement={(
          <Link href={tokenInfo.coinmarketcapLink} underline="hover" target="_blank">
            {asset}
          </Link>
        )}
        action={<QuickTipButton hoverText="The price of cryptos based on multiple inputs." disableDialog />}
      />
      <CardContent style={{ height: '100%' }}>
        <FlexCol alignItems="stretch" height="100%" justifyContent="flex-start">
          <FlexCol alignItems="stretch" justifyContent="flex-start">
            <Paper
              sx={{
                alignItems: 'stretch', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden',
              }}
              elevation={0}
            >
              {Object.entries(priceInfo?.value ?? {}).map(([currency, price], index, arr) => (
                <Fragment key={currency}>
                  <TokenBar square text1={currency.toUpperCase()} text2={formattedPrice(price)} text2Props={{ title: price }} {...tokenBarBgProps} />
                  {/* hide the last divider */}
                  {index === arr.length - 1 ? null : <Divider flexItem />}
                </Fragment>
              ))}
            </Paper>
          </FlexCol>
        </FlexCol>
      </CardContent>
    </Card>
  )
}
