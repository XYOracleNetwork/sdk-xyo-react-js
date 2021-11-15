import { InfuraProvider, JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers'
import { EthAddress } from '@xylabs/sdk-js'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { useAsyncEffect } from '../../lib'
import { EthersContext } from './Context'
import { infuraKey } from './Infura'

interface Props {
  enabled?: boolean
}

export const MyEtherWalletEthersLoader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = window as any
  const ethereum = global.ethereum
  const [error, setError] = useState<Error>()
  const [localAddress, setLocalAddress] = useState<EthAddress>()
  const [providerName, setProviderName] = useState<string>()

  if (ethereum) {
    ethereum.autoRefreshOnNetworkChange = false
  }

  const connect = async () => {
    await global.ethereum?.enable()
    return localAddress ? [localAddress.toString()] : []
  }

  const [isConnected, setIsConnected] = useState<boolean>()

  const [walletProvider, setWalletProvider] = useState<Web3Provider | null>()
  const [provider, setProvider] = useState<Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner | null>()
  useEffect(() => {
    const walletProvider = ethereum ? new Web3Provider(ethereum) : null
    let provider = null
    let providerName = null
    if (walletProvider) {
      provider = walletProvider
      providerName = 'MyEtherWallet'
    } else {
      provider = new InfuraProvider(1, infuraKey)
      providerName = 'Infura (Default)'
    }
    setProvider(provider)
    setProviderName(providerName)
    setWalletProvider(walletProvider)
    let signer = null
    try {
      signer = walletProvider?.getSigner()
    } catch (ex) {
      console.error(ex)
    }
    setSigner(signer)
  }, [ethereum, isConnected])

  useAsyncEffect(
    async (isMounted) => {
      if (signer) {
        try {
          const localAddress = EthAddress.fromString(await signer.getAddress())
          if (isMounted()) {
            setLocalAddress(localAddress)
            setIsConnected(true)
          }
        } catch (ex) {
          if (isMounted()) {
            setError(Error(`localAddress: ${ex}`))
            setLocalAddress(undefined)
            setIsConnected(false)
          }
        }
      }
    },
    [signer]
  )

  const [chainId, setChainId] = useState<number>()
  useAsyncEffect(
    async (isMounted) => {
      const chainId = (await provider?.getNetwork())?.chainId
      if (!isMounted()) return
      setChainId(chainId)
    },
    [provider]
  )

  return (
    <EthersContext.Provider
      value={{
        busy: false,
        chainId,
        connect,
        error,
        isConnected,
        localAddress,
        provider,
        providerName,
        signer: isConnected ? signer : undefined,
        walletProvider,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}
