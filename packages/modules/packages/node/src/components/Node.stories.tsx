import { Decorator, Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { WithChildren } from '@xylabs/react-shared'
import { AbstractModule, Query } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { MemoryNodeProvider } from '@xyo-network/react-node-provider'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

import { useModuleFromNode, useProvidedNode } from '../hooks'

const TestModuleConfigSchema = 'network.xyo.test.module'
class TestModule extends AbstractModule {
  static override readonly configSchemas: string[] = [TestModuleConfigSchema]
  get _queryAccountPaths(): Record<Query['schema'], string> {
    return {}
  }
}
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

const UseModuleTest: React.FC<WithChildren> = ({ children }) => {
  const [testModule] = useModuleFromNode(TestModuleName)

  useEffect(() => {
    if (testModule) {
      // Should be called but isn't
      console.log('*****test module*****', testModule)
    }
  }, [testModule])

  return <>{children}</>
}

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/node/NodeBox',
} as Meta

const Template: StoryFn<React.FC> = (props) => {
  const [node] = useProvidedNode() as [MemoryNode]
  const [description, setDescription] = useState<string>()

  const [account] = useWallet({ mnemonic: DefaultSeedPhrase, path: '0' })

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node && account) {
        try {
          const mod = await TestModule.create({ account, config: { name: TestModuleName, schema: TestModuleConfigSchema } })
          await node?.register(mod)
          await node?.attach(mod.address, true)
          const wrapper = NodeWrapper.wrap(node)
          const description = await wrapper?.describe()
          if (mounted()) {
            setDescription(JSON.stringify(description, null, 2))
          }
        } catch (e) {
          console.error(e)
        }
      }
    },
    [node, account],
  )

  return (
    <div {...props}>
      <UseModuleTest>
        <pre>{description}</pre>
      </UseModuleTest>
    </div>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithModules = Template.bind({})
WithModules.argTypes = {}
WithModules.decorators = [MemoryNodeDecorator]

export { Default, WithModules }
