import { Button, Typography } from '@mui/material'
import { generateMnemonic } from '@scure/bip39'
// eslint-disable-next-line import/no-internal-modules
import { wordlist } from '@scure/bip39/wordlists/english'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { SeedPhraseDialog } from './SeedPhraseDialog'

// eslint-disable-next-line import/no-default-export
export default {
  component: SeedPhraseDialog,
  title: 'Wallet/SeedPhraseDialog',
} as Meta

const Template: StoryFn<typeof SeedPhraseDialog> = (props) => {
  const mnemonic = generateMnemonic(wordlist, 256)
  const [seedPhrase, setSeedPhrase] = useState(mnemonic)
  const [open, setOpen] = useState(false)
  return (
    <FlexCol rowGap={3}>
      <Button variant={'contained'} onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Typography>Seed Phrase</Typography>
      <code>{seedPhrase}</code>
      <SeedPhraseDialog seedPhrase={seedPhrase} changeSeedPhrase={setSeedPhrase} {...props} open={open} onClose={() => setOpen(false)} />
    </FlexCol>
  )
}

const Default = Template.bind({})

export { Default }
