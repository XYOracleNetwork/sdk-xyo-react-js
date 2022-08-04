import { Grid } from '@mui/material'
import { XyoPayload } from '@xyo-network/payload'

import { CryptoAsset } from './Asset'
import { XyoCryptoAssetPayload } from './lib'

interface CryptoMarketResultRendererProps {
  payload?: XyoPayload
}

export const CryptoAssetRenderer: React.FC<CryptoMarketResultRendererProps> = ({ payload }) => {
  const cryptoAssetPayload = payload ? (payload as XyoCryptoAssetPayload) : undefined

  return (
    <Grid container justifyContent="center">
      {cryptoAssetPayload
        ? Object.entries(cryptoAssetPayload.assets).map(([asset, priceInfo]) => <CryptoAsset key={asset} asset={asset} priceInfo={priceInfo} />)
        : null}
    </Grid>
  )
}
