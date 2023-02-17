// Payload for common fields across Gas Price Witnesses
export interface GasPriceWitnessUIBasePayload {
  baseFee?: UIField
  blockNumber?: UIField
  gasPrice?: GasPrice[]
  schema?: string
  timestamp?: number
  // @field website for the company
  website?: string
}

interface GasPrice {
  price?: UIField
  priorityFee?: UIField
}

interface UIField {
  label?: string
  value?: number
}
