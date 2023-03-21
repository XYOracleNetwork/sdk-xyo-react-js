import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Account } from '@xyo-network/account'

import { AddressMenuItemRenderer } from './MenuItemRenderer'

const StorybookEntry = {
  argTypes: {},
  component: AddressMenuItemRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/address/MenuItem',
} as ComponentMeta<typeof AddressMenuItemRenderer>

const Template: ComponentStory<typeof AddressMenuItemRenderer> = (args) => {
  return <AddressMenuItemRenderer {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = {
  address: new Account({ phrase: 'temp' }).addressValue.hex,
}

const WithIcon = Template.bind({})
WithIcon.args = {
  address: new Account({ phrase: 'temp' }).addressValue.hex,
  icons: true,
}

const WithIconOnly = Template.bind({})
WithIconOnly.args = {
  address: new Account({ phrase: 'temp' }).addressValue.hex,
  iconOnly: true,
  icons: true,
}

export { Default, WithAddress, WithIcon, WithIconOnly }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
