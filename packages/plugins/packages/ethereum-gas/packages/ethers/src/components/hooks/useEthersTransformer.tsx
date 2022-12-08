import { XyoEthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

const calculateGasPrice = (maxFeePerGas?: number | null, lastBaseFeePerGas?: number | null) => {
  if (!maxFeePerGas || !lastBaseFeePerGas) {
    return
  }

  return (maxFeePerGas - lastBaseFeePerGas) / 1_000_000_000
}

export const useEthersTransformer = (payload?: XyoEthereumGasEthersPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'lastBaseFeePerGas',
        value: payload.lastBaseFeePerGas ? payload.lastBaseFeePerGas / 1_000_000_000 : undefined,
      },
      gasPrice: [
        {
          price: {
            label: 'maxFeePerGas - baseFee',
            value: calculateGasPrice(payload?.maxFeePerGas, payload?.lastBaseFeePerGas),
          },
          priorityFee: {
            label: 'maxPriorityFeePerGas',
            value: payload.maxPriorityFeePerGas ? payload.maxPriorityFeePerGas / 1_000_000_000 : undefined,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://docs.ethers.io/v5/api/providers/provider/#Provider-getFeeData',
    }
  }
}
