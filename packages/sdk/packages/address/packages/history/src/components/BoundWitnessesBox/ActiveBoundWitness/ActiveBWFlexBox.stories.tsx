import type { Decorator, Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'
import React from 'react'

import { ActiveBWDecoratorWithDefaultValues, WithResetDecorator } from '../../stories/index.ts'
import { ActiveBWFlexBox } from './ActiveBWFlexBox.tsx'

const WithRefDecorator: Decorator = (Story, args) => {
  const [ref] = useEvent((noun, verb, data) => console.log(noun, verb, data))
  args.args.ref = ref
  return <Story {...args} />
}

export default {
  component: ActiveBWFlexBox,
  title: 'address/history/ActiveBWFlexBox',
} as Meta

const Template: StoryFn<typeof ActiveBWFlexBox> = props => <ActiveBWFlexBox {...props} />

const Default = Template.bind({})
Default.args = {}

const WithActiveBW = Template.bind({})
WithActiveBW.args = {}
WithActiveBW.decorators = [ActiveBWDecoratorWithDefaultValues]

const WithActiveBWRef = Template.bind({})
WithActiveBWRef.args = {}
WithActiveBWRef.decorators = [WithRefDecorator, ActiveBWDecoratorWithDefaultValues]

const WithActiveBWReset = Template.bind({})
WithActiveBWReset.args = {}
WithActiveBWReset.decorators = [WithResetDecorator, ActiveBWDecoratorWithDefaultValues]

export { Default, WithActiveBW, WithActiveBWRef, WithActiveBWReset }
