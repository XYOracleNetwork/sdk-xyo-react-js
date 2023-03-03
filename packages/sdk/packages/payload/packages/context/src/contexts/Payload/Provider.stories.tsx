/* eslint-disable import/no-internal-modules */
import { ComponentStory, DecoratorFn } from '@storybook/react'
import React from 'react'

import { PayloadProvider } from './Provider'
import { usePayload } from './use'

const PayloadProviderDecorator: DecoratorFn = (Story, args) => (
  <PayloadProvider hash={'b8806035d69dc4dd8b893a5b1a85452cbdd909fb82b9bf1217b0ac7e0cb9dbed'}>
    <Story {...args} />
  </PayloadProvider>
)

const StorybookEntry = {
  title: 'payload/PayloadProvider',
}

const Template: ComponentStory<React.FC> = () => {
  const { payload } = usePayload()

  return <pre>{JSON.stringify(payload, null, 2)}</pre>
}

const Default = Template.bind({})
Default.decorators = [PayloadProviderDecorator]
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
