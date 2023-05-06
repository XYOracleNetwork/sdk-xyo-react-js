import { Meta, StoryObj } from '@storybook/react'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist'
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'

import { ModuleCardParser } from './ModuleCardParser'

const meta: Meta<typeof ModuleCardParser> = {
  component: ModuleCardParser,
  render: (props, { loaded }) => <ModuleCardParser {...props} {...loaded} />,
  title: 'node/renderer/ModuleCardParser',
}

// eslint-disable-next-line import/no-default-export
export default meta
type Story = StoryObj<typeof ModuleCardParser>

export const WithArchivist: Story = {
  loaders: [
    async () => ({
      module: await MemoryArchivist.create({ config: { name: 'MemoryArchivist', schema: MemoryArchivistConfigSchema } }),
    }),
  ],
}

export const WithWitness: Story = {
  loaders: [
    async () => ({
      module: await IdWitness.create({ config: { name: 'IdWitness', schema: IdWitnessConfigSchema } }),
    }),
  ],
}
