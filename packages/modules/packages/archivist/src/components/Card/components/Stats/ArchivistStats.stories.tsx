import { Meta, StoryFn } from '@storybook/react'
import { Account } from '@xyo-network/account'
import { BoundWitnessBuilder } from '@xyo-network/boundwitness-builder'
import { Payload } from '@xyo-network/payload-model'

import { ArchivistStats } from './ArchivistStats'

const account = Account.random()
const payload = () => ({ schema: 'network.xyo.payload', timestamp: Date.now() })
const boundWitness = () => new BoundWitnessBuilder().payload(payload()).witness(account).build()

const StorybookEntry = {
  component: ArchivistStats,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/archivist/ArchivistStats',
} as Meta<typeof ArchivistStats>

const Template: StoryFn<typeof ArchivistStats> = (props) => <ArchivistStats {...props} />

const Default = Template.bind({})
const WithStats = Template.bind({})
WithStats.args = {
  addresses: { [account.address]: 1 },
  boundWitnesses: [boundWitness() as unknown as Payload],
  payloads: [payload(), boundWitness() as unknown as Payload],
  schemas: { 'network.xyo.boundwitness': 1, 'network.xyo.payload': 1 },
}

export { Default, WithStats }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
