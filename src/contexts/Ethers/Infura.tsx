import { InfuraProvider } from '@ethersproject/providers'
import React, { PropsWithChildren } from 'react'

import { EthersContext } from './Context'

interface Props {
  enabled?: boolean
}

export const infuraKey = '1d9f8053c65a49cfb99fafaa8ef201c0'

export const InfuraEthersLoader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props

  const chainId = 1
  const provider = new InfuraProvider(1, infuraKey)

  return (
    <EthersContext.Provider
      value={{
        busy: false,
        chainId,
        isConnected: true,
        provider,
        signer: null,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}
