import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { WithNestedBoundWitnessesDecorator } from '../../stories/index.ts'
import { GlowingDiv } from './GlowingDiv.tsx'

export default {
  component: GlowingDiv,
  decorators: [WithNestedBoundWitnessesDecorator],
  title: 'address/history/GlowingDiv',
} as Meta

const Template: StoryFn<typeof GlowingDiv> = (props) => {
  return <GlowingDiv style={{ height: '200px' }} {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
