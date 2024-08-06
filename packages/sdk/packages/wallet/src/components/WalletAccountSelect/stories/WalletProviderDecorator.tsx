import { Decorator } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import React from 'react'

import { WalletProvider } from '../../../contexts/index.ts'
import { useWallet } from '../../../hooks/index.ts'

export const WalletProviderDecorator: Decorator = (Story, context) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={rootWallet}>
      <Story {...context} />
    </WalletProvider>
  )
}
