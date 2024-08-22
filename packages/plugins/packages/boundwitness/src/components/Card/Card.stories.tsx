import type { Meta, StoryFn } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'
import React from 'react'

import { BoundWitnessRendererCard } from './Card.tsx'

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
