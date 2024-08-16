import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { TestComponentProps } from './TestComponent.tsx'
import { TestComponent } from './TestComponent.tsx'

export default {
  title: 'modules/os/TestComponent',
} as Meta

const Template: StoryFn<React.FC<TestComponentProps>> = (props) => {
  return <TestComponent {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
