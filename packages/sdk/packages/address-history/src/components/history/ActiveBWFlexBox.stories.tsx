import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'

import { ActiveBoundWitnessProvider } from '../../contexts'
import { ActiveBWFlexBox } from './ActiveBWFlexBox'
import { sampleAddressHistory } from './sampleAddressHistory.stories'

const ActiveBWDecorator: DecoratorFn = (Story, args) => {
  return (
    <ActiveBoundWitnessProvider activeBoundWitness={sampleAddressHistory[0]}>
      <Story {...args} />
    </ActiveBoundWitnessProvider>
  )
}

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
