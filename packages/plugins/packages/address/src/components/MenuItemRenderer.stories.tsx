import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Account } from '@xyo-network/account'

import { AddressMenuItemRenderer } from './MenuItemRenderer'

const address = new Account({ phrase: 'temp' }).addressValue.hex

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
  address,
}

const WithIcon = Template.bind({})
WithIcon.args = {
  address,
  icons: true,
}

const WithIconOnly = Template.bind({})
WithIconOnly.args = {
  address,
  iconOnly: true,
  icons: true,
}

const WithNullAddress = Template.bind({})
WithNullAddress.args = {
  address: null,
}

const WithNullAddressCustom = Template.bind({})
WithNullAddressCustom.args = {
  AddressNullComponent: <span>foo</span>,
  address: null,
}

const WithFavorite = Template.bind({})
WithFavorite.args = {
  address,
  favorite: true,
  icons: true,
  showFavorite: true,
}

export { Default, WithAddress, WithFavorite, WithIcon, WithIconOnly, WithNullAddress, WithNullAddressCustom }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
