import { ComponentStory, Meta } from '@storybook/react'

import { WithHashSelectionHistoryDefaultValues } from '../../stories'
import { NestedBoundWitnessesBox } from './NestedBoundWitnessesBox'

// eslint-disable-next-line import/no-default-export
export default {
  component: NestedBoundWitnessesBox,
  decorators: [WithHashSelectionHistoryDefaultValues],
  title: 'address/history/NestedBoundWitnessesBox',
} as Meta

const Template: ComponentStory<typeof NestedBoundWitnessesBox> = (props) => {
  return <NestedBoundWitnessesBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
