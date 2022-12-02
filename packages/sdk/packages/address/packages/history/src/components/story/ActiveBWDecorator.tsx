import { DecoratorFn } from '@storybook/react'
import { WithChildren } from '@xylabs/react-shared'
import { StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { PayloadWrapper } from '@xyo-network/payload'
import { StorageArchivistProvider, useArchivist } from '@xyo-network/react-archivist'
import { usePromise } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'

import { ActiveBoundWitnessProvider } from '../../providers'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <StorageArchivistProvider config={{ namespace: 'AddressHistory', schema: StorageArchivistConfigSchema, type: 'local' }}>
      <ActiveBWDecoratorInner>
        <Story {...args} />
      </ActiveBWDecoratorInner>
    </StorageArchivistProvider>
  )
}

const ActiveBWDecoratorInner: React.FC<WithChildren> = ({ children }) => {
  const { archivist } = useArchivist()

  usePromise(archivist?.insert(sampleAddressHistory), [archivist])
  return <ActiveBoundWitnessProvider activeBoundWitnessHash={new PayloadWrapper(sampleAddressHistory[0]).hash}>{children}</ActiveBoundWitnessProvider>
}
