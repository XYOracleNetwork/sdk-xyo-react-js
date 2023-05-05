import { Meta, StoryObj } from '@storybook/react'

import { ModuleCardParser } from './ModuleCardParser'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist';
import { IdWitness, IdWitnessConfigSchema } from '@xyo-network/id-plugin'

const meta: Meta<typeof ModuleCardParser> = {
  component: ModuleCardParser,
  title: 'node/renderer/ModuleCardParser',
  render: (props, { loaded } ) => <ModuleCardParser {...props} {...loaded} />
}

// eslint-disable-next-line import/no-default-export
export default meta
type Story = StoryObj<typeof ModuleCardParser>;


export const WithArchivist: Story = {
  loaders: [
    async () => ({
      module: await MemoryArchivist.create({ config: { schema: MemoryArchivistConfigSchema, name: 'MemoryArchivist' } }),
    }),
  ],
};

export const WithWitness: Story = {
  loaders: [
    async () => ({
      module: await IdWitness.create({ config: { schema: IdWitnessConfigSchema, name: 'IdWitness' } }),
    }),
  ],
};
