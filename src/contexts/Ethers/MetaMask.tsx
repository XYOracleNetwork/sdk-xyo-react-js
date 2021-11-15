import { InfuraProvider, JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers'
import { EthAddress } from '@xylabs/sdk-js'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { useAsyncEffect } from '../../lib'
import { EthersContext } from './Context'
import { infuraKey } from './Infura'

interface Props {
  enabled?: boolean
}

export const MetaMaskEthersLoader: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, enabled = true } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = window as any
  const ethereum = global.ethereum
  const [error, setError] = useState<Error>()
  const [localAddress, setLocalAddress] = useState<EthAddress>()
  const [resetCount, setResetCount] = useState(0)
  const [providerName, setProviderName] = useState<string>()

  if (ethereum) {
    ethereum.autoRefreshOnNetworkChange = false
  }

  const connect = async () => {
    await global.ethereum?.enable()
    return localAddress ? [localAddress.toString()] : []
  }

  const [isConnected, setIsConnected] = useState<boolean>()

  useEffect(() => {
    if (ethereum && enabled) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        console.log(`accountsChanged: ${JSON.stringify(accounts)}`)
        setResetCount(resetCount + 1)
        if (accounts.length > 0) {
          setLocalAddress(EthAddress.fromString(accounts[0]))
        } else {
          setLocalAddress(undefined)
        }
      })
      ethereum.on('chainChanged', (chainId: string) => {
        setResetCount(resetCount + 1)
        if (chainId) {
          setChainId(parseInt(chainId))
        } else {
          setChainId(undefined)
        }
      })
    }
  }, [ethereum, resetCount, enabled])

  const [walletProvider, setWalletProvider] = useState<Web3Provider | null>()
  const [provider, setProvider] = useState<Provider>()
  const [signer, setSigner] = useState<JsonRpcSigner | null>()

  useEffect(() => {
    if (enabled) {
      const walletProvider = ethereum ? new Web3Provider(ethereum) : null
      let provider = null
      let providerName = null
      if (walletProvider) {
        provider = walletProvider
        providerName = 'Meta Mask'
      } else {
        provider = new InfuraProvider(1, infuraKey)
        providerName = 'Infura (Default)'
      }
      provider = walletProvider ?? provider
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
    }
  }, [ethereum, isConnected, enabled])

  useAsyncEffect(
    async (isMounted) => {
      if (signer && enabled) {
        try {
          const localAddress = EthAddress.fromString(await signer.getAddress())
          console.log(`Setting Local Address: ${localAddress}`)
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
    [signer, resetCount, enabled]
  )

  const [chainId, setChainId] = useState<number>()
  useAsyncEffect(
    async (isMounted) => {
      if (enabled) {
        const chainId = (await provider?.getNetwork())?.chainId
        if (!isMounted()) return
        setChainId(chainId)
      }
    },
    [provider, enabled]
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
