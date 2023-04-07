import { Meta, StoryFn } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'

import { BoundWitnessRendererCard } from './Card'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessRendererCard,
  title: 'plugin/boundwitness/CardRenderer',
} as Meta

const Template: StoryFn<typeof BoundWitnessRendererCard> = (props) => {
  return <BoundWitnessRendererCard {...props} />
}

const Default = Template.bind({})
Default.args = { payload: sampleBlock }

const WithActive = Template.bind({})
WithActive.args = { active: true, payload: sampleBlock }

export { Default, WithActive }
