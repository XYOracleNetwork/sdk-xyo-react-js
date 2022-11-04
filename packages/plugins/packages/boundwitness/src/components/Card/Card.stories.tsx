import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'

import { ActiveBoundWitnessProvider } from '../../contexts'
import { BoundWitnessRendererCard } from './Card'

const ActiveBoundWitnessDecorator: DecoratorFn = (Story, args) => {
  return (
    <ActiveBoundWitnessProvider activeBoundWitness={sampleBlock}>
      <Story {...args} />
    </ActiveBoundWitnessProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessRendererCard,
  title: 'plugin/boundwitness/CardRenderer',
} as Meta

const Template: ComponentStory<typeof BoundWitnessRendererCard> = (props) => {
  return <BoundWitnessRendererCard {...props} />
}

const Default = Template.bind({})
Default.args = { payload: sampleBlock }

const WithActive = Template.bind({})
WithActive.decorators = [ActiveBoundWitnessDecorator]
WithActive.args = { payload: sampleBlock }

export { Default, WithActive }
