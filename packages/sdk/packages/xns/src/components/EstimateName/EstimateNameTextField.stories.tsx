import type { Meta, StoryFn } from '@storybook/react'
import React, { useState } from 'react'

import { XnsEstimateNameTextField } from './EstimateNameTextField.tsx'

export default { title: 'modules/xns/XnsNameEstimateTextField' } as Meta

const Template: StoryFn<typeof XnsEstimateNameTextField> = (args) => {
  return <XnsEstimateNameTextField {...args}></XnsEstimateNameTextField>
}

const TemplateWithExternalValue: StoryFn<typeof XnsEstimateNameTextField> = (args) => {
  const [value] = useState('foobar')
  return <XnsEstimateNameTextField value={value} {...args}></XnsEstimateNameTextField>
}

const Default = Template.bind({})
Default.args = {}

const WithExternalValue = TemplateWithExternalValue.bind({})
WithExternalValue.args = {}

export { Default, WithExternalValue }
