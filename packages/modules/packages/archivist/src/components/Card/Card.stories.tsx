import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { Account } from '@xyo-network/account'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import { ArchivistInsertQuerySchema, ArchivistInstance } from '@xyo-network/archivist-model'
import { QueryBoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { MemoryNode } from '@xyo-network/node-memory'

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
    const account = await Account.random()
    const builder = await new QueryBoundWitnessBuilder().payloads([insertQuery, payload]).signer(account).query(insertQuery)
    const [insertQueryBoundWitness, payloads] = await builder.build()
    await archivist.insert([insertQueryBoundWitness, ...payloads])
  }
}

const clearArchivist = async (archivist?: ArchivistInstance) => {
  await archivist?.clear?.()
}

const Template: StoryFn<typeof ArchivistCard> = () => {
  const [node] = usePromise(async () => {
    return await MemoryNode.create()
  }, [])

  const [mod] = usePromise(async () => {
    if (node) {
      const newParentModule = await MemoryArchivist.create()
      await node?.register(newParentModule)
      await node?.attach(newParentModule.address)

      const newModule = await MemoryArchivist.create({
        config: {
          name: 'MemoryArchivist',
          parents: { commit: [newParentModule.address], read: [newParentModule.address], write: [newParentModule.address] },
          schema: MemoryArchivistConfigSchema,
        },
      })
      await node?.register(newModule)
      await node?.attach(newModule.address)

      await insertPayload(newModule)
      return newModule
    }
  }, [node])

  return (
    <FlexCol gap={2}>
      <ArchivistCard mod={mod} />
      <Button onClick={() => insertPayload(mod)} variant={'contained'}>
        Insert Into Archivist
      </Button>
      <Button onClick={() => clearArchivist(mod)} variant={'contained'}>
        Clear Archivist
      </Button>
    </FlexCol>
  )
}

const SingleModule = Template.bind({})

export { SingleModule }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
