import { ComponentStoryFn, Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

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

const Template: ComponentStoryFn<typeof BoundWitnessesBox> = (props) => {
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
