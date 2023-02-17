import { ComponentStory, Meta } from '@storybook/react'

import { WithNestedBoundWitnessesDecorator } from '../../stories'
import { GlowingDiv } from './GlowingDiv'

// eslint-disable-next-line import/no-default-export
export default {
  component: GlowingDiv,
  decorators: [WithNestedBoundWitnessesDecorator],
  title: 'address/history/GlowingDiv',
} as Meta

const Template: ComponentStory<typeof GlowingDiv> = (props) => {
  return <GlowingDiv style={{ height: '200px' }} {...props} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
