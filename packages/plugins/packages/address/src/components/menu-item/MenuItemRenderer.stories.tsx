import { Meta, StoryFn } from '@storybook/react'
import { Account } from '@xyo-network/account'
import { AddressPayload, AddressSchema } from '@xyo-network/payload-plugins'
import { useEvent } from '@xyo-network/react-event'

import { AddressMenuItemRenderer } from './MenuItemRenderer'

const address = new Account({ phrase: 'temp' }).addressValue.hex
const payload: AddressPayload = {
  address,
  schema: AddressSchema,
}

const StorybookEntry = {
  argTypes: {},
  component: AddressMenuItemRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/address/MenuItem',
} as Meta<typeof AddressMenuItemRenderer>

const Template: StoryFn<typeof AddressMenuItemRenderer> = (args) => {
  const [ref] = useEvent<HTMLLIElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`))
  return <AddressMenuItemRenderer {...args} ref={ref} />
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = {
  payload,
}

const WithName = Template.bind({})
WithName.args = {
  payload: {
    ...payload,
    name: 'My-Address',
  } as AddressPayload,
}

export { Default, WithAddress, WithName }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
