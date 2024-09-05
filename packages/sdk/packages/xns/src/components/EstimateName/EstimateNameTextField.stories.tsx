import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { XnsEstimateNameTextField } from './EstimateNameTextField.tsx'

export default { title: 'modules/xns/XnsNameEstimateTextField' } as Meta

const Template: StoryFn<typeof XnsEstimateNameTextField> = (args) => {
  return <XnsEstimateNameTextField {...args}></XnsEstimateNameTextField>
}

const Default = Template.bind({})
Default.args = {}

export { Default }
