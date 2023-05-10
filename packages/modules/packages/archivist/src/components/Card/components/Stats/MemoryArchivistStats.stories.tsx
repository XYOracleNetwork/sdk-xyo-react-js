import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Account } from '@xyo-network/account'
import { ArchivistInsertQuerySchema, ArchivistModule, ArchivistWrapper, MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { QueryBoundWitnessBuilder } from '@xyo-network/module'
import { useState } from 'react'

import { MemoryArchivistsStats } from './MemoryArchivistStats'

const StorybookEntry = {
  component: MemoryArchivistsStats,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/archivist/MemoryArchivistsStats',
} as Meta<typeof MemoryArchivistsStats>

const Template: StoryFn<typeof MemoryArchivistsStats> = () => {
  const [module, setModule] = useState<ArchivistModule>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (!module) {
        const newParentModule = await MemoryArchivist.create()
        const newModule = await MemoryArchivist.create({
          config: {
            name: 'MemoryArchivist',
            parents: { commit: [newParentModule.address], read: [newParentModule.address], write: [newParentModule.address] },
            schema: MemoryArchivistConfigSchema,
          },
        })
        const payload = { schema: 'network.xyo.payload' }
        const insertQuery = { schema: ArchivistInsertQuerySchema }
        const account = new Account()
        const [insertQueryBoundWitness, payloads] = new QueryBoundWitnessBuilder({ inlinePayloads: true })
          .payloads([insertQuery, payload])
          .witness(account)
          .query(insertQuery)
          .build()
        const wrapper = ArchivistWrapper.wrap(newModule, account)
        await wrapper.insert([insertQueryBoundWitness, ...payloads])
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return <MemoryArchivistsStats archivist={module} />
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
