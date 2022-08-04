import { XyoPayload } from '@xyo-network/payload'

export interface XyoCryptoAssetValue {
  value: {
    [currency: string]: string
  }
}

export interface XyoCryptoAssetPayload extends XyoPayload {
  assets: {
    [symbol: string]: XyoCryptoAssetValue
  }
}
