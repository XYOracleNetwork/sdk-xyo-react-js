import { Grid } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import type { CryptoMarketAssetPayload } from '@xyo-network/crypto-asset-payload-plugin'
import type { Payload } from '@xyo-network/payload-model'
import type { PayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'
import { PayloadDataMissing } from '@xyo-network/react-shared'
import React from 'react'

import { CryptoAsset } from './Asset.tsx'

export type CryptoAssetRendererProps = PayloadDetailsRenderProps & {
  payload?: Payload
}

const isEmpty = (obj?: object) => Object.keys(obj ?? {}).length === 0

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
