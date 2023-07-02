import { Decorator, Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistConfigSchema, MemoryArchivist } from '@xyo-network/archivist'
import { MemoryNode, NodeConfigSchema } from '@xyo-network/node'
import { NodeProvider, useWrappedProvidedNode } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { EventObject } from 'cytoscape'
import { useEffect, useState } from 'react'

import { CytoscapeInstanceProvider, useCytoscapeInstance } from '../contexts'
import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraph } from './RelationalGraph'

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const node = await MemoryNode.create({ config: { name: 'GlobalNode', schema: NodeConfigSchema } })

      const archivist = await MemoryArchivist.create({ config: { name: 'RootStorageArchivist', schema: ArchivistConfigSchema } })
      await node.register(archivist)
      await node.attach(archivist.address, true)

      setNode(node)
    },
    [],
  )

  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={wallet}>
      <NodeProvider node={node}>
        <CytoscapeInstanceProvider>
          <Story {...args} />
        </CytoscapeInstanceProvider>
      </NodeProvider>
    </WalletProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeRelationalGraph,
  title: 'node/renderer/NodeRelationalGraphEvents',
} as Meta

const Template: StoryFn<typeof NodeRelationalGraph> = (props) => {
  const [node] = useWrappedProvidedNode()
  const elements = useCytoscapeElements(node)
  const options = useCytoscapeOptions(elements)

  const { cy } = useCytoscapeInstance(true)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      console.log(element.data().address)
    }
    if (cy) {
      cy.on('select', listener)
    }

    return () => {
      cy?.off('select', listener)
    }
  }, [cy])
  return <NodeRelationalGraph options={options} {...props} />
}

const defaultProps = {
  height: 'calc(100vh - 20px)',
  width: '100%',
}

const Default = Template.bind({})
Default.args = { ...defaultProps }
Default.decorators = [MemoryNodeDecorator]

export { Default }
