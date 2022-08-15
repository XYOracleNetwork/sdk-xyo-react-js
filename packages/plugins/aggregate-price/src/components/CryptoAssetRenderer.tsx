import { Grid } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import isEmpty from 'lodash/isEmpty'

import { CryptoAsset } from './Asset'
import { XyoCryptoAssetPayload } from './lib'

export interface CryptoAssetRendererProps extends XyoPayloadDetailsRenderProps {
  payload?: XyoPayload
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CryptoAssetRenderer: React.FC<CryptoAssetRendererProps> = ({ payload, ...props }) => {
  const cryptoAssetPayload = payload ? (payload as XyoCryptoAssetPayload) : undefined

  // once plugin supports listMode, this can go away
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { listMode, ...flexBoxProps } = props

  if (isEmpty(cryptoAssetPayload?.assets)) {
    return <PayloadDataMissing alertBody="Payload is missing valid asset prices" />
  }

  return (
    <FlexCol alignItems="stretch" justifyContent="flex-start" {...flexBoxProps}>
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
