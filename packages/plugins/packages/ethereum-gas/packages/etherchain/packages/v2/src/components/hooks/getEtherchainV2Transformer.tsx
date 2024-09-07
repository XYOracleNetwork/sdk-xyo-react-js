import type { EthereumGasEtherchainV2Payload } from '@xyo-network/etherchain-ethereum-gas-v2-payload-plugin'
import type { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const getEtherchainV2Transformer = (payload?: EthereumGasEtherchainV2Payload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      gasPrice: [
        {
          price: {
            label: 'slow',
            value: payload.data?.slow ? payload.data?.slow / 1_000_000_000 : undefined,
          },
        },
        {
          price: {
            label: 'standard',
            value: payload.data?.standard ? payload.data?.standard / 1_000_000_000 : undefined,
          },
        },
        {
          price: {
            label: 'fast',
            value: payload.data?.fast ? payload.data?.fast / 1_000_000_000 : undefined,
          },
        },
        {
          price: {
            label: 'rapid',
            value: payload.data?.rapid ? payload.data?.rapid / 1_000_000_000 : undefined,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://www.etherchain.org/api/gasPriceOracle',
    }
  }
}
