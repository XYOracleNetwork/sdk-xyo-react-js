import { Table, TableBody } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { SeedPhraseTableRow } from './SeedPhraseTableRow.tsx'

const changeSeedPhrase = (phrase?: string) => alert(`Changed Seed Phrase to: ${phrase}`)

export default {
  component: SeedPhraseTableRow,
  title: 'Wallet/SeedPhraseTableRow',
} as Meta

const Template: StoryFn<typeof SeedPhraseTableRow> = props => (
  <Table>
    <TableBody>
      <SeedPhraseTableRow {...props} />
    </TableBody>
  </Table>
)

const Default = Template.bind({})
Default.args = { changeSeedPhrase }

const WithSeedPhrase = Template.bind({})
WithSeedPhrase.args = {
  changeSeedPhrase,
  seedPhrase: 'test me',
}

export { Default, WithSeedPhrase }
