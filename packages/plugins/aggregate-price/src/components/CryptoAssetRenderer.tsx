import { Grid } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { XyoPayload } from '@xyo-network/payload'

import { CryptoAsset } from './Asset'
import { XyoCryptoAssetPayload } from './lib'

export interface CryptoAssetRendererProps extends FlexBoxProps {
  payload?: XyoPayload
}

export const CryptoAssetRenderer: React.FC<CryptoAssetRendererProps> = ({ payload, ...props }) => {
  const cryptoAssetPayload = payload ? (payload as XyoCryptoAssetPayload) : undefined

  return (
    <FlexCol alignItems="stretch" justifyContent="flex-start" {...props}>
      <Grid container spacing={2} justifyContent="center">
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
