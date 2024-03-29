import { Decorator } from '@storybook/react'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'

import { WalletProvider } from '../../../contexts'
import { useWallet } from '../../../hooks'

export const WalletProviderDecorator: Decorator = (Story, context) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={rootWallet}>
      <Story {...context} />
    </WalletProvider>
  )
}
