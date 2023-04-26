// TODO - eventually this needs to come from the sdk-xyo-client-js

import { Payload } from '@xyo-network/payload-model'

export type ForecastingDivinerSchema = 'network.xyo.diviner.forecasting'
export const ForecastingDivinerSchema: ForecastingDivinerSchema = 'network.xyo.diviner.forecasting'

export type ForecastPayloadSchema = `${ForecastingDivinerSchema}.forecast`
export const ForecastPayloadSchema: ForecastPayloadSchema = `${ForecastingDivinerSchema}.forecast`

export interface Forecast {
  error?: number
  timestamp?: number
  value: number
}

export type ForecastPayload = Payload<{
  schema: ForecastPayloadSchema
  values: Forecast[]
}>
