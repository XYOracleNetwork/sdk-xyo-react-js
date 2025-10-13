import type { Payload } from '@xyo-network/payload-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'

export const PriceWidgetConfigSchema = 'network.xyo.price.widget.config' as const
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
  // Version of the config
  version: string
}

export type PriceWidgetConfig = Payload<PriceWidgetConfigFields, PriceWidgetConfigSchema>

export const isPriceWidgetConfig = isPayloadOfSchemaType<PriceWidgetConfig>(PriceWidgetConfigSchema)
