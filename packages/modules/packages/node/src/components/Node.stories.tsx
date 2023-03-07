import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { HDWallet } from '@xyo-network/account'
import { AbstractModule } from '@xyo-network/module'
import { MemoryNode, NodeConfigSchema, NodeWrapper } from '@xyo-network/node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { WalletProvider } from '@xyo-network/react-wallet'
import { useEffect, useState } from 'react'

import { MemoryNodeProvider } from '../contexts'
import { useModule, useProvidedNode } from '../hooks'

class TestModule extends AbstractModule {}
const TestModuleName = 'TestModule'

const MemoryNodeDecorator: DecoratorFn = (Story, args) => {
  const randomWallet = HDWallet.fromMnemonic(DefaultSeedPhrase)
  return (
    <WalletProvider defaultWallet={randomWallet}>
      <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
        <Story {...args} />
      </MemoryNodeProvider>
    </WalletProvider>
  )
}

const UseModuleTest: React.FC<WithChildren> = ({ children }) => {
  const [testModule] = useModule(TestModuleName)

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

const Template: ComponentStory<React.FC> = (props) => {
  const [node] = useProvidedNode() as [MemoryNode]
  const [description, setDescription] = useState<string>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (node) {
        try {
          const mod = await TestModule.create({ config: { name: TestModuleName, schema: 'network.xyo.test.module' } })
          node?.register(mod)
          await node?.attach(mod.address)
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
    [node],
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
