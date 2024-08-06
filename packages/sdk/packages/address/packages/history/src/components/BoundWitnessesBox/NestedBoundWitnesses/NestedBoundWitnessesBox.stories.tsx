import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { WithHashSelectionHistoryDefaultValues } from '../../stories/index.js'
import { NestedBoundWitnessesBox } from './NestedBoundWitnessesBox.js'

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
