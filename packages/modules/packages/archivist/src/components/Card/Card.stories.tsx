import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { Account } from '@xyo-network/account'
import { ArchivistInsertQuerySchema, ArchivistInstance, MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { QueryBoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { useState } from 'react'

import { ArchivistCard } from './Card'

const StorybookEntry = {
  component: ArchivistCard,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/archivist/ArchivistCard',
} as Meta<typeof ArchivistCard>

const insertPayload = async (archivist?: ArchivistInstance) => {
  if (archivist) {
    const payload = { schema: 'network.xyo.payload', timestamp: Date.now() }
    const insertQuery = { schema: ArchivistInsertQuerySchema }
    const account = await Account.randomSync()
    const builder = new QueryBoundWitnessBuilder({ inlinePayloads: true }).payloads([insertQuery, payload]).witness(account).query(insertQuery)
    const [insertQueryBoundWitness, payloads] = await builder.build()
    await archivist.insert([insertQueryBoundWitness, ...payloads])
  }
}

const clearArchivist = async (archivist?: ArchivistInstance) => {
  await archivist?.clear?.()
}

const Template: StoryFn<typeof ArchivistCard> = () => {
  const [module, setModule] = useState<ArchivistInstance>()

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
        await insertPayload(newModule)
        if (mounted()) {
          setModule(newModule)
        }
      }
    },
    [module],
  )

  return (
    <FlexCol gap={2}>
      <ArchivistCard module={module} />
      <Button onClick={() => insertPayload(module)} variant={'contained'}>
        Insert Into Archivist
      </Button>
      <Button onClick={() => clearArchivist(module)} variant={'contained'}>
        Clear Archivist
      </Button>
    </FlexCol>
  )
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
