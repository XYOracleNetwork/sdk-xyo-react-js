import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'
import type { To } from 'react-router-dom'

import { XnsNameCapture } from './XnsNameCapture.tsx'

export default { title: 'modules/xns/XnsNameCapture' } as Meta

const Template: StoryFn<typeof XnsNameCapture> = (args) => {
  return <XnsNameCapture {...args}></XnsNameCapture>
}

const Default = Template.bind({})
Default.args = {}

const WithOnBuyName = Template.bind({})
WithOnBuyName.args = { navigate: (to: To) => alert(`navigated to: ${to}`), onCaptureName: (name: string) => Promise.resolve(alert(`Buy Name: ${name}`)) }

export { Default, WithOnBuyName }
