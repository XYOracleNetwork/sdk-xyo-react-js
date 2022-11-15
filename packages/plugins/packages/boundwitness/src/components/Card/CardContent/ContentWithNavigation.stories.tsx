import { ComponentStory, Meta } from '@storybook/react'

import { BoundWitnessCardContentWithNavigation } from './ContentWithNavigation'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessCardContentWithNavigation,
  title: 'plugin/boundwitness/BoundWitnessCardContentWithNavigation',
} as Meta

const Template: ComponentStory<typeof BoundWitnessCardContentWithNavigation> = (props) => <BoundWitnessCardContentWithNavigation {...props} />

const Default = Template.bind({})
Default.args = {}

export { Default }
