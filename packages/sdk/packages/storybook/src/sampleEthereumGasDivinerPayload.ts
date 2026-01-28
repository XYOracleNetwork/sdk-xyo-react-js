import { asSchema } from '@xyo-network/payload-model'

export const sampleEthereumGasDivinerPayload = {
  baseFee: 13.364_650_519_8,
  feePerGas: {
    high: 17.306_096_430_2,
    low: 12.155_000_000_000_001,
    medium: 12.5625,
    veryHigh: 16.546_248_588_5,
  },
  priorityFeePerGas: {
    high: 1.075,
    low: 0.746_666_666_666_666_7,
    medium: 0.856_666_666_666_666_8,
    veryHigh: 1.276_666_666_666_666_6,
  },
  schema: asSchema('network.xyo.blockchain.ethereum.gas', true),
  timestamp: 1_669_819_808_305,
}

export const sampleEthereumGasDivinerPayloadMissingFees = {
  feePerGas: {},
  priorityFeePerGas: {},
  schema: asSchema('network.xyo.blockchain.ethereum.gas', true),
  timestamp: 1_659_071_465_718,
}
