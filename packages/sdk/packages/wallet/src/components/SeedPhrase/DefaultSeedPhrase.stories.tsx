import { ComponentStory, Meta } from '@storybook/react'

import { DefaultSeedPhrase } from './DefaultSeedPhrase'

// eslint-disable-next-line import/no-default-export
export default {
  component: DefaultSeedPhrase,
  title: 'Wallet/DefaultSeedPhrase',
} as Meta

const Template: ComponentStory<typeof DefaultSeedPhrase> = (props) => <DefaultSeedPhrase {...props} />

const Default = Template.bind({})
Default.args = {
  seedPhrase: 'test me',
}

const WithoutDefaultSeedPhrase = Template.bind({})
WithoutDefaultSeedPhrase.args = {
  changeSeedPhrase: (mnemonic?: string) => alert(`Generated Default Seed Phrase: ${mnemonic}`),
}

export { Default, WithoutDefaultSeedPhrase }
