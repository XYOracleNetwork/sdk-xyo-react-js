import type { Meta, StoryFn } from '@storybook/react-vite'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
  ActiveBWDecorator,
  ActiveBWDecoratorWithDefaultValues,
  WithHashSelectionHistory,
  WithHashSelectionHistoryDefaultValues,
  WithNestedBoundWitnessesDecorator,
} from '../stories/index.ts'
import { BoundWitnessesBox } from './BoundWitnessesBox.tsx'

export default {
  component: BoundWitnessesBox,
  decorators: [ActiveBWDecorator],
  title: 'address/history/BoundWitnessesBox',
} as Meta

const Template: StoryFn<typeof BoundWitnessesBox> = (props: FlexBoxProps) => {
  return (
    <BrowserRouter>
      <BoundWitnessesBox {...props} />
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.decorators = [ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator]

const WithData = Template.bind({})
WithData.decorators = [ActiveBWDecoratorWithDefaultValues, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator]

const WithNested = Template.bind({})
WithNested.decorators = [ActiveBWDecoratorWithDefaultValues, WithHashSelectionHistoryDefaultValues, WithNestedBoundWitnessesDecorator]

export {
  Default, WithData, WithNested,
}
