import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useXyoEvent } from '@xyo-network/react-event'
import { sampleBlock } from '@xyo-network/react-storybook'
import { useRef } from 'react'

import { BoundWitnessDetailsCard } from './DetailsCard'

const WithEventDecorator: DecoratorFn = (Story, args) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tableRef] = useXyoEvent<HTMLDivElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`), ref)
  args.args.ref = tableRef

  return <Story {...args} />
}

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessDetailsCard,
  title: 'plugin/boundwitness/DetailsCard',
} as Meta

const Template: ComponentStory<typeof BoundWitnessDetailsCard> = (props) => <BoundWitnessDetailsCard {...props} />

const Default = Template.bind({})
Default.args = { payload: sampleBlock }

const WithRef = Template.bind({})
WithRef.decorators = [WithEventDecorator]
WithRef.args = { payload: sampleBlock }

const WithVisibleRows = Template.bind({})
WithVisibleRows.args = { payload: sampleBlock, visibleRows: 3 }

export { Default, WithRef, WithVisibleRows }
