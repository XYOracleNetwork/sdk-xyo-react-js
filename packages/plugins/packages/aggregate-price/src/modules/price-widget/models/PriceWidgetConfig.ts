import type { Payload } from '@xyo-network/payload-model'
import { asSchema, isPayloadOfSchemaType } from '@xyo-network/payload-model'

export const PriceWidgetConfigSchema = asSchema('network.xyo.price.widget.config', true)
export type PriceWidgetConfigSchema = typeof PriceWidgetConfigSchema

export type PriceWidgetConfigFields = {
  buyLink?: string
  // Name of the currency
  currency: string
  // Number of decimal places to display
  decimals: number
  // Icon of the currency - currently only supports svg
  iconSrc?: string
  // json path to the price value
  priceJsonPaths: string[]
  // Source of the data - i.e. API endpoint
  source: string
}

export type PriceWidgetConfig = Payload<PriceWidgetConfigFields, PriceWidgetConfigSchema>

export const isPriceWidgetConfig = isPayloadOfSchemaType<PriceWidgetConfig>(PriceWidgetConfigSchema)

export const isPriceWidgetConfigLike = (obj: unknown): obj is PriceWidgetConfigFields => {
  if (typeof obj !== 'object' || obj === null) return false
  const o = obj as PriceWidgetConfigFields
  return (
    typeof o.currency === 'string'
    && typeof o.decimals === 'number'
    && Array.isArray(o.priceJsonPaths)
    && o.priceJsonPaths.every(p => typeof p === 'string')
    && typeof o.source === 'string'
    && (o.buyLink === undefined || typeof o.buyLink === 'string')
    && (o.iconSrc === undefined || typeof o.iconSrc === 'string')
  )
}
