import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { PayloadWrapper } from '@xyo-network/payload'
import { sampleBlock } from '@xyo-network/react-storybook'

import { NestedBoundWitnessesProvider } from '../../../contexts'
import { NestedBoundWitnessBox } from './NestedBoundWitnessBox'

const WithNestedBoundWitnessesDecorator: DecoratorFn = (Story, args) => (
  <NestedBoundWitnessesProvider>
    <Story {...args} />
  </NestedBoundWitnessesProvider>
)

// eslint-disable-next-line import/no-default-export
export default {
  component: NestedBoundWitnessBox,
  decorators: [WithNestedBoundWitnessesDecorator],
  title: 'address/history/NestedBoundWitnessBox',
} as Meta

const Template: ComponentStory<typeof NestedBoundWitnessBox> = (props) => {
  return <NestedBoundWitnessBox {...props} />
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  boundwitness: sampleBlock,
  hash: new PayloadWrapper(sampleBlock).hash,
  index: 0,
}

export { Default, WithData }
