import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { XnsNameCapture } from './XnsNameCapture.tsx'

export default { title: 'modules/xns/XnsNameCapture' } as Meta

const Template: StoryFn<typeof XnsNameCapture> = (args) => {
  return <XnsNameCapture {...args}></XnsNameCapture>
}

const Default = Template.bind({})
Default.args = {}

const WithOnBuyName = Template.bind({})
WithOnBuyName.args = { onBuyName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)) }

export { Default, WithOnBuyName }