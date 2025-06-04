import type { Meta, StoryFn } from '@storybook/react-vite'
import type { Address } from '@xylabs/hex'
import { toHex } from '@xylabs/hex'
import type { AddressPayload } from '@xyo-network/module-model'
import { AddressSchema } from '@xyo-network/module-model'
import { useEvent } from '@xyo-network/react-event'
import { randomBytes } from 'ethers'
import React from 'react'

import { AddressMenuItemRenderer } from './MenuItemRenderer.tsx'

const address: Address = toHex(randomBytes(20).buffer)
const payload: AddressPayload = {
  address,
  schema: AddressSchema,
}

const StorybookEntry = {
  argTypes: {},
  component: AddressMenuItemRenderer,
  parameters: { docs: { page: null } },
  title: 'plugin/address/MenuItem',
} as Meta<typeof AddressMenuItemRenderer>

const Template: StoryFn<typeof AddressMenuItemRenderer> = (args) => {
  const [ref] = useEvent<HTMLLIElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`))
  return <AddressMenuItemRenderer {...args} ref={ref} />
}

const Default = Template.bind({})
Default.args = {}

const WithAddress = Template.bind({})
WithAddress.args = { payload }

const WithName = Template.bind({})
WithName.args = {
  payload: {
    ...payload,
    name: 'My-Address',
  } as AddressPayload,
}

export {
  Default, WithAddress, WithName,
}

export default StorybookEntry
