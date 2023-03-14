import { DecoratorFn } from '@storybook/react'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { StorageArchivist, StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { MemoryNode } from '@xyo-network/node'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { useArchivist } from '@xyo-network/react-archivist'
import { NodeProvider } from '@xyo-network/react-node'
import { usePromise } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { ActiveBoundWitnessProvider } from '../../providers'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const memoryNode = await MemoryNode.create()
      const archivist = await StorageArchivist.create({
        config: { namespace: 'AddressHistory', schema: StorageArchivistConfigSchema, type: 'local' },
      })
      await memoryNode.register(archivist).attach(archivist.address)
      if (mounted()) {
        setNode(memoryNode)
      }
    },
    [],
  )

  return (
    <NodeProvider node={node}>
      <ActiveBWDecoratorInner>
        <Story {...args} />
      </ActiveBWDecoratorInner>
    </NodeProvider>
  )
}

const ActiveBWDecoratorInner: React.FC<WithChildren> = ({ children }) => {
  const [archivist] = useArchivist()

  usePromise(archivist?.insert(sampleAddressHistory), [archivist])
  return <ActiveBoundWitnessProvider activeBoundWitnessHash={new PayloadWrapper(sampleAddressHistory[0]).hash}>{children}</ActiveBoundWitnessProvider>
}
