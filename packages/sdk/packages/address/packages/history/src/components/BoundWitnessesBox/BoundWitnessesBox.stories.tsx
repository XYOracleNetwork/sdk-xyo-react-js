import { Meta, StoryFn } from '@storybook/react'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { BrowserRouter } from 'react-router-dom-6'

import {
  ActiveBWDecorator,
  ActiveBWDecoratorWithDefaultValues,
  WithHashSelectionHistory,
  WithHashSelectionHistoryDefaultValues,
  WithNestedBoundWitnessesDecorator,
} from '../stories'
import { BoundWitnessesBox } from './BoundWitnessesBox'

// eslint-disable-next-line import/no-default-export
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

export { Default, WithData, WithNested }
