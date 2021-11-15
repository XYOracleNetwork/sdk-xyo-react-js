import { Web3Provider } from '@ethersproject/providers'
import { EthAddress } from '@xylabs/sdk-js'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { EthersContext } from './Context'

interface Props {
  enabled?: boolean
}

export const TrustEthersLoader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = window as any
  const [error, setError] = useState<Error>()
  const [localAddress, setLocalAddress] = useState<EthAddress>()

  const trustProvider = new Web3Provider(global.ethereum)
  const signer = trustProvider.getSigner()

  const chainId = 1

  const provider = trustProvider

  useEffect(() => {
    let cancelled = false

    if (signer) {
      const load = async () => {
        try {
          const localAddress = EthAddress.fromString(await signer.getAddress())
          if (!cancelled) {
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
  }, [signer])

  return (
    <EthersContext.Provider
      value={{
        busy: false,
        chainId,
        error,
        localAddress,
        provider,
        signer,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}
