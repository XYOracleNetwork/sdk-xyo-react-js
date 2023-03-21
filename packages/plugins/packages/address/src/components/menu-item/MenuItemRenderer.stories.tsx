import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Account } from '@xyo-network/account'
import { useXyoEvent } from '@xyo-network/react-event'

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
  const [ref] = useXyoEvent<HTMLLIElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`))
  return <AddressMenuItemRenderer {...args} ref={ref} />
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = {
  address,
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

export { Default, WithAddress, WithNullAddress, WithNullAddressCustom }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
