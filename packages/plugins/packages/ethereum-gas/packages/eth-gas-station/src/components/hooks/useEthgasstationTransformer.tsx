import { XyoEthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useEthgasstationTransformer = (payload?: XyoEthereumGasEthgasstationPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'baseFee',
        value: payload.baseFee,
      },
      blockNumber: {
        label: 'blockNumber',
        value: payload.blockNumber,
      },
      gasPrice: [
        {
          price: {
            label: 'fast',
            value: payload.gasPrice?.fast,
          },
          priorityFee: {
            label: 'priorityFee',
            value: payload.priorityFee?.fast,
          },
        },
        {
          price: {
            label: 'instant',
            value: payload.gasPrice?.instant,
          },
          priorityFee: {
            label: 'priorityFee',
            value: payload.priorityFee?.instant,
          },
        },
        {
          price: {
            label: 'standard',
            value: payload.gasPrice?.standard,
          },
          priorityFee: {
            label: 'priorityFee',
            value: payload.priorityFee?.standard,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://api.ethgasstation.info/redoc#/paths/~1api~1fee-estimate/get',
    }
  }
}
