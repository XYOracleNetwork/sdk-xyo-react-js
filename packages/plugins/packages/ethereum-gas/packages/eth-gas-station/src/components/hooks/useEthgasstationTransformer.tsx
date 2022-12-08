import { XyoEthereumGasEthgasstationPayload } from '@xyo-network/ethgasstation-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

const calculateGasPrice = (gasPrice?: number, baseFee?: number, priorityFee?: number) => {
  if (!gasPrice || !baseFee || !priorityFee) {
    return
  }

  return gasPrice - baseFee - priorityFee
}

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
            value: calculateGasPrice(payload.gasPrice?.fast, payload?.baseFee, payload.priorityFee?.fast),
          },
          priorityFee: {
            label: 'priorityFee',
            value: payload.priorityFee?.fast,
          },
        },
        {
          price: {
            label: 'instant',
            value: calculateGasPrice(payload.gasPrice?.instant, payload?.baseFee, payload.priorityFee?.instant),
          },
          priorityFee: {
            label: 'priorityFee',
            value: payload.priorityFee?.instant,
          },
        },
        {
          price: {
            label: 'standard',
            value: calculateGasPrice(payload.gasPrice?.standard, payload?.baseFee, payload.priorityFee?.standard),
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
