import { DecoratorFn } from '@storybook/react'
import { WithChildren } from '@xylabs/react-shared'
import { XyoStorageArchivistConfigSchema } from '@xyo-network/archivist'
import { PayloadWrapper } from '@xyo-network/payload'
import { StorageArchivistProvider, useArchivistInsert } from '@xyo-network/react-archivist'
import { sampleAddressHistory } from '@xyo-network/react-storybook'

import { ActiveBoundWitnessProvider } from '../../contexts'

export const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <StorageArchivistProvider config={{ namespace: 'AddressHistory', schema: XyoStorageArchivistConfigSchema, type: 'local' }}>
      <ActiveBWDecoratorInner>
        <Story {...args} />
      </ActiveBWDecoratorInner>
    </StorageArchivistProvider>
  )
}

const ActiveBWDecoratorInner: React.FC<WithChildren> = ({ children }) => {
  useArchivistInsert(sampleAddressHistory, true)
  return <ActiveBoundWitnessProvider activeBoundWitnessHash={new PayloadWrapper(sampleAddressHistory[0]).hash}>{children}</ActiveBoundWitnessProvider>
}
