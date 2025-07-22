import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { SeedPhraseProvider } from '../../../../../contexts/index.ts'
import { PhraseDialogActions } from './PhraseDialogActions.tsx'

export default {
  title: 'Wallet/PhraseDialogActions',
  component: PhraseDialogActions,
} as Meta

const Template: StoryFn<typeof PhraseDialogActions> = args => (
  <SeedPhraseProvider>
    <PhraseDialogActions {...args} />
  </SeedPhraseProvider>
)

const Default = Template.bind({})
Default.args = {}

const WithHideGenerate = Template.bind({})
WithHideGenerate.args = { hideGenerate: true }

const WithHideClear = Template.bind({})
WithHideClear.args = { hideClear: true }

export {
  Default, WithHideClear, WithHideGenerate,
}
