import { ComponentStoryFn, Meta } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator } from '../story'
import { BoundWitnessesBox } from './BoundWitnessesBox'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessesBox,
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
Default.args = {}

const WithData = Template.bind({})
WithData.decorators = [ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator]

export { Default, WithData }
