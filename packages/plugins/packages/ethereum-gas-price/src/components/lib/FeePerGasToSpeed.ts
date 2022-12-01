import { FeePerGas } from '@xyo-network/gas-price-payload-plugin'

export type FeePerGasValue = keyof FeePerGas
export type Speed = 'slowest' | 'slow' | 'fast' | 'fastest'

export const FeePerGasValues: FeePerGasValue[] = ['low', 'medium', 'high', 'veryHigh']

export const FeePerGasToSpeed: Record<keyof FeePerGas, Speed> = {
  high: 'fast',
  low: 'slowest',
  medium: 'slow',
  veryHigh: 'fastest',
}
