import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { EthAddress } from '@xylabs/sdk-js'
import React, { PropsWithChildren, useState } from 'react'

import { EthersContext } from './Context'

interface Props {
  enabled?: boolean
}

export const OperaEthersLoader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = window as any
  const ethereum = global.ethereum
  const [error, setError] = useState<Error>()
  const [signer, setSigner] = useState<JsonRpcSigner>()
  const [provider, setProvider] = useState<JsonRpcProvider>()
  const [localAddress, setLocalAddress] = useState<EthAddress | undefined | null>(
    (global.ethereum?.addresses?.length ?? 0) > 0 ? EthAddress.fromString(global.ethereum?.addresses?.[0]) : null
  )

  const chainId = ethereum?.chainId ? parseInt(ethereum?.chainId) : 1
  const isConnected = ethereum?.isConnected() ?? false

  React.useEffect(() => {
    let cancelled = false

    if (ethereum) {
      ethereum.enable()
      const operaProvider = new Web3Provider(ethereum)
      const provider = operaProvider
      const signer = operaProvider.getSigner()
      const load = async () => {
        try {
          const localAddress = EthAddress.fromString(await signer.getAddress())
          ethereum.autoRefreshOnNetworkChange = false
          if (!cancelled) {
            setSigner(signer)
            setProvider(provider)
            setLocalAddress(localAddress)
          }
        } catch (ex) {
          if (!cancelled) {
            setError(Error(`localAddress: ${ex}`))
          }
        }
      }

      load()
    }

    return () => {
      cancelled = true
    }
  }, [ethereum])

  return (
    <EthersContext.Provider
      value={{
        busy: false,
        chainId,
        error,
        isConnected,
        localAddress,
        provider,
        signer,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}
