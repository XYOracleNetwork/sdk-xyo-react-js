import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { XnsNameEstimateTextField } from './NameEstimateTextField.tsx'

export default { title: 'modules/xns/XnsNameEstimateTextField' } as Meta

const Template: StoryFn<typeof XnsNameEstimateTextField> = (args) => {
  return <XnsNameEstimateTextField {...args}></XnsNameEstimateTextField>
}

const Default = Template.bind({})
Default.args = {}

export { Default }
