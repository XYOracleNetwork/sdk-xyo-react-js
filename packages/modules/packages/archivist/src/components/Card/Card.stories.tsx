import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { Account } from '@xyo-network/account'
import { ArchivistInsertQuerySchema, ArchivistModule, ArchivistWrapper, MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { QueryBoundWitnessBuilder } from '@xyo-network/module'
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

const insertPayload = async (archivist?: ArchivistModule) => {
  if (archivist) {
    const payload = { schema: 'network.xyo.payload', timestamp: Date.now() }
    const insertQuery = { schema: ArchivistInsertQuerySchema }
    const account = new Account()
    const [insertQueryBoundWitness, payloads] = new QueryBoundWitnessBuilder({ inlinePayloads: true })
      .payloads([insertQuery, payload])
      .witness(account)
      .query(insertQuery)
      .build()
    const wrapper = ArchivistWrapper.wrap(archivist, account)
    await wrapper.insert([insertQueryBoundWitness, ...payloads])
  }
}

const Template: StoryFn<typeof ArchivistCard> = () => {
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
    </FlexCol>
  )
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
