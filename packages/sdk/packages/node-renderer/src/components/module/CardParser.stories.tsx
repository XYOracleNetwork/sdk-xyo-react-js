import type { Meta, StoryObj } from '@storybook/react'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'
import React from 'react'

import { ModuleCardParser } from './CardParser.tsx'

const meta: Meta<typeof ModuleCardParser> = {
  component: ModuleCardParser,
  render: (props, { loaded }) => <ModuleCardParser {...props} {...loaded} />,
  title: 'node/renderer/ModuleCardParser',
}

export default meta
type Story = StoryObj<typeof ModuleCardParser>

export const WithArchivist: Story = {
  loaders: [
    async () => {
      const ParentArchivist = await MemoryArchivist.create({ config: { name: 'ParentArchivist', schema: MemoryArchivistConfigSchema } })
      return {
        mod: await MemoryArchivist.create({
          config: {
            name: 'MemoryArchivist', parents: { write: [ParentArchivist.address] }, schema: MemoryArchivistConfigSchema,
          },
        }),
      }
    },
  ],
}

export const WithWitness: Story = {
  loaders: [
    async () => ({ mod: await IdWitness.create({ config: { name: 'IdWitness', schema: IdWitnessConfigSchema } }) }),
  ],
}
