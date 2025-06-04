import type {
  Decorator, Meta, StoryFn,
} from '@storybook/react-vite'
import { useEvent } from '@xyo-network/react-event'
import { sampleBlock } from '@xyo-network/react-storybook'
import React, { useRef } from 'react'

import { BoundWitnessDetailsCard } from './DetailsCard.tsx'

const WithEventDecorator: Decorator = (Story, args) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tableRef] = useEvent<HTMLDivElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`), ref)
  args.args.ref = tableRef

  return <Story {...args} />
}

export default {
  component: BoundWitnessDetailsCard,
  title: 'plugin/boundwitness/DetailsCard',
} as Meta

const Template: StoryFn<typeof BoundWitnessDetailsCard> = props => <BoundWitnessDetailsCard {...props} />

const Default = Template.bind({})
Default.args = { payload: sampleBlock }

const WithRef = Template.bind({})
WithRef.decorators = [WithEventDecorator]
WithRef.args = { payload: sampleBlock }

const WithVisibleRows = Template.bind({})
WithVisibleRows.args = { payload: sampleBlock, visibleRows: 3 }

export {
  Default, WithRef, WithVisibleRows,
}
