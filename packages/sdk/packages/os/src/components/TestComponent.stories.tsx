import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { TestComponent, TestComponentProps } from './TestComponent.js'

export default {
  title: 'modules/os/TestComponent',
} as Meta

const Template: StoryFn<React.FC<TestComponentProps>> = (props) => {
  return <TestComponent {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
