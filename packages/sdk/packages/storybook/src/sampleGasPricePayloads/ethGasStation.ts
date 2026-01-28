import { asSchema } from '@xyo-network/payload-model'

export const sampleEthGasStationGasPricePayload = {
  baseFee: 37,
  blockNumber: 16_134_572,
  blockTime: 11.88,
  gasPrice: {
    fast: 84,
    instant: 97,
    standard: 53,
  },
  nextBaseFee: 37,
  priorityFee: {
    fast: 5,
    instant: 14,
    standard: 2,
  },
  schema: asSchema('network.xyo.blockchain.ethereum.gas.ethgasstation', true),
  timestamp: 1_670_437_200_687,
}
