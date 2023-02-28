import { DecoratorFn } from '@storybook/react'
import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { MemoryNode, NodeWrapper } from '@xyo-network/node'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { useArchivist } from '@xyo-network/react-archivist'
import { usePromise } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { ActiveBoundWitnessProvider } from '../../providers'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  const [node, setNode] = useState<NodeWrapper>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const node = NodeWrapper.wrap(await MemoryNode.create())
      if (mounted()) {
        setNode(node)
      }
    },
    [],
  )

  return (
    <StorageArchivistProvider config={{ namespace: 'AddressHistory', schema: StorageArchivistConfigSchema, type: 'local' }}>
      <ActiveBWDecoratorInner>
        <Story {...args} />
      </ActiveBWDecoratorInner>
    </StorageArchivistProvider>
  )
}

const ActiveBWDecoratorInner: React.FC<WithChildren> = ({ children }) => {
  const archivist = useArchivist()

  usePromise(archivist?.insert(sampleAddressHistory), [archivist])
  return <ActiveBoundWitnessProvider activeBoundWitnessHash={new PayloadWrapper(sampleAddressHistory[0]).hash}>{children}</ActiveBoundWitnessProvider>
}
