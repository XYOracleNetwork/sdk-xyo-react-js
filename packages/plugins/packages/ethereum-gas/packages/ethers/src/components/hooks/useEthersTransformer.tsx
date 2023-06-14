import { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useEthersTransformer = (payload?: EthereumGasEthersPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'lastBaseFeePerGas',
        value: payload.lastBaseFeePerGas ? payload.lastBaseFeePerGas / 1_000_000_000 : undefined,
      },
      gasPrice: [
        {
          price: {
            label: 'gasPrice',
            value: payload.gasPrice ? payload.gasPrice / 1_000_000_000 : undefined,
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
