import { ComponentStory, Meta } from '@storybook/react'

import { BoundWitnessCardBottomNavigation } from './BottomNavigation'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessCardBottomNavigation,
  title: 'plugin/boundwitness/BoundWitnessCardBottomNavigation',
} as Meta

const Template: ComponentStory<typeof BoundWitnessCardBottomNavigation> = (props) => {
  return <BoundWitnessCardBottomNavigation {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
