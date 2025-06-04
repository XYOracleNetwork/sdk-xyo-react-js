import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { WithHashSelectionHistoryDefaultValues } from '../../stories/index.ts'
import { NestedBoundWitnessesBox } from './NestedBoundWitnessesBox.tsx'

export default {
  component: NestedBoundWitnessesBox,
  decorators: [WithHashSelectionHistoryDefaultValues],
  title: 'address/history/NestedBoundWitnessesBox',
} as Meta

const Template: StoryFn<typeof NestedBoundWitnessesBox> = (props) => {
  return <NestedBoundWitnessesBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
