import { ComponentStory, Meta } from '@storybook/react'

import { ActiveBWFlexBox } from './ActiveBWFlexBox'
import { ActiveBWDecorator } from './storybook'

// eslint-disable-next-line import/no-default-export
export default {
  component: ActiveBWFlexBox,
  title: 'addressHistory/ActiveBWFlexBox',
} as Meta

const Template: ComponentStory<typeof ActiveBWFlexBox> = (props) => {
  return <ActiveBWFlexBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithActiveBW = Template.bind({})
WithActiveBW.args = {}
WithActiveBW.decorators = [ActiveBWDecorator]

export { Default, WithActiveBW }
