import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { Account } from '@xyo-network/account'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import { ArchivistInsertQuerySchema, ArchivistInstance } from '@xyo-network/archivist-model'
import { QueryBoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { MemoryNode } from '@xyo-network/node-memory'
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
  const [mod, setModule] = useState<ArchivistInstance>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      if (!mod) {
        const node = await MemoryNode.create()
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
        const account = Account.randomSync()
        const builder = await new QueryBoundWitnessBuilder().payloads([insertQuery, payload]).signer(account).query(insertQuery)
        const [insertQueryBoundWitness, payloads] = await builder.build()
        await node.register(newParentModule)
        await node.attach(newParentModule.address)
        await node.register(newModule)
        await node.attach(newModule.address)
        await newModule.insert([insertQueryBoundWitness, ...payloads])
        setModule(newModule)
      }
    },
    [mod],
  )

  return <MemoryArchivistsStats archivist={mod} />
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
