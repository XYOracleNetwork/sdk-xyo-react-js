import { Meta, StoryFn } from '@storybook/react'

import { WalletAccountSelect } from './Select.js'
import { WalletProviderDecorator } from './stories/index.js'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelect,
  decorators: [WalletProviderDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'wallet/WalletAccountSelectWithProvider',
} as Meta<typeof WalletAccountSelect>

const Template: StoryFn<typeof WalletAccountSelect> = (args) => {
  return <WalletAccountSelect {...args}></WalletAccountSelect>
}

const Default = Template.bind({})
Default.args = {}

const DefaultIcons = Template.bind({})
DefaultIcons.args = { icons: true }

const DefaultSmall = Template.bind({})
DefaultSmall.args = { size: 'small' }

const DefaultSmallIcon = Template.bind({})
DefaultSmallIcon.args = { icons: true, size: 'small' }

const IconsOnly = Template.bind({})
IconsOnly.args = { iconOnly: true, icons: true }

const IconsOnlySmall = Template.bind({})
IconsOnlySmall.args = { iconOnly: true, icons: true, size: 'small' }

export { Default, DefaultIcons, DefaultSmall, DefaultSmallIcon, IconsOnly, IconsOnlySmall }

export default StorybookEntry
