import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { MemoryNodeProvider } from '@xyo-network/react-node-provider'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import React from 'react'

import { useWeakProvidedNode } from '../hooks/index.ts'
import { NodeBox } from './Node.tsx'
import { TestModule, TestModuleConfigSchema } from './TestModule.ts'

const TestModuleName = 'TestModule'

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={wallet}>
      <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
        <Story {...args} />
      </MemoryNodeProvider>
    </WalletProvider>
  )
}

export default { title: 'modules/node/NodeBox' } as Meta

const Template: StoryFn<React.FC> = () => {
  const [node] = useWeakProvidedNode() as [WeakRef<MemoryNode>]

  const [account] = useWallet({ mnemonic: DefaultSeedPhrase, path: '0' })

  useAsyncEffect(

    async () => {
      const nodeInstance = node?.deref()
      if (nodeInstance && account) {
        try {
          const mod = await TestModule.create({
            account,
            config: { name: TestModuleName, schema: TestModuleConfigSchema },
          })
          await nodeInstance.register(mod)
          await nodeInstance.attach(mod.address, true)
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node, account],
  )

  return <NodeBox node={node} variant="description" maxWidth={640} />
}

const Default = Template.bind({})
Default.args = {}

const WithModules = Template.bind({})
WithModules.argTypes = {}
WithModules.decorators = [MemoryNodeDecorator]

export { Default, WithModules }
