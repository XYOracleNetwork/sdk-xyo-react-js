import { Grid } from '@mui/material'
import { isEmpty } from '@xylabs/lodash'
import { FlexCol } from '@xylabs/react-flexbox'
import { CryptoMarketAssetPayload } from '@xyo-network/crypto-asset-payload-plugin'
import { Payload } from '@xyo-network/payload-model'
import { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'

import { CryptoAsset } from './Asset.js'

export interface CryptoAssetRendererProps extends PayloadDetailsRenderProps {
  payload?: Payload
}

export const CryptoAssetRenderer: React.FC<CryptoAssetRendererProps> = ({ payload, ...props }) => {
  const cryptoAssetPayload = payload ? (payload as CryptoMarketAssetPayload) : undefined

  if (isEmpty(cryptoAssetPayload?.assets)) {
    return <PayloadDataMissing alertBody="Payload is missing valid asset prices" />
  }

  return (
    <FlexCol alignItems="stretch" justifyContent="flex-start" {...props}>
      <Grid container spacing={1} justifyContent="center">
        {cryptoAssetPayload
          ? Object.entries(cryptoAssetPayload.assets).map(([asset, priceInfo]) => (
            <Grid item key={asset} xs={12} md={6} lg={4} xl={3}>
              <CryptoAsset style={{ height: '100%' }} asset={asset} priceInfo={priceInfo} />
            </Grid>
          ))
          : null}
      </Grid>
    </FlexCol>
  )
}
