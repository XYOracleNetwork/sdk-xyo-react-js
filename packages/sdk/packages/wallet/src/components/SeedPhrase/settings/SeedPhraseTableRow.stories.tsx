import { Table, TableBody } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'

import { SeedPhraseTableRow } from './SeedPhraseTableRow'

const changeSeedPhrase = (phrase?: string) => alert(`Changed Seed Phrase to: ${phrase}`)

// eslint-disable-next-line import/no-default-export
export default {
  component: SeedPhraseTableRow,
  title: 'Wallet/SeedPhraseTableRow',
} as Meta

const Template: ComponentStory<typeof SeedPhraseTableRow> = (props) => (
  <Table>
    <TableBody>
      <SeedPhraseTableRow {...props} />
    </TableBody>
  </Table>
)

const Default = Template.bind({})
Default.args = {
  changeSeedPhrase,
}

const WithSeedPhrase = Template.bind({})
WithSeedPhrase.args = {
  changeSeedPhrase,
  seedPhrase: 'test me',
}

export { Default, WithSeedPhrase }
