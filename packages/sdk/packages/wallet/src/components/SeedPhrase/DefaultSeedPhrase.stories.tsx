import { Meta, StoryFn } from '@storybook/react'

import { DefaultSeedPhrase } from './DefaultSeedPhrase'

// eslint-disable-next-line import/no-default-export
export default {
  component: DefaultSeedPhrase,
  title: 'Wallet/DefaultSeedPhrase',
} as Meta

const Template: StoryFn<typeof DefaultSeedPhrase> = (props) => <DefaultSeedPhrase {...props} />

const Default = Template.bind({})
Default.args = {
  seedPhrase: 'test me',
}

const WithoutDefaultSeedPhrase = Template.bind({})
WithoutDefaultSeedPhrase.args = {
  changeSeedPhrase: (mnemonic?: string) => alert(`Generated Default Seed Phrase: ${mnemonic}`),
}

const WithHiddenDefaultSeedPhrase = Template.bind({})
WithHiddenDefaultSeedPhrase.args = {
  hideDefaultSeedPhraseMessage: true,
  ...WithoutDefaultSeedPhrase.args,
}

export { Default, WithHiddenDefaultSeedPhrase, WithoutDefaultSeedPhrase }
