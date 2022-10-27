import { ComponentStory, Meta } from '@storybook/react'
import { sampleBlock } from '@xyo-network/react-storybook'

import { BoundWitnessRendererCard } from './Card'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessRendererCard,
  title: 'plugin/boundwitness/CardRenderer',
} as Meta

export const Template: ComponentStory<typeof BoundWitnessRendererCard> = (props) => {
  return <BoundWitnessRendererCard {...props} />
}

const Default = Template.bind({})
Default.args = { boundwitness: sampleBlock }

export { Default }
