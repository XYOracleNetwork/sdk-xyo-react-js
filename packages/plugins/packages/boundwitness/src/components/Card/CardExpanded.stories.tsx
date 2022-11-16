import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { useXyoEvent } from '@xyo-network/react-event'
import { sampleBlockWithBoundWitnessPayload } from '@xyo-network/react-storybook'
import { useRef } from 'react'

import { BoundWitnessRendererCardExpanded } from './CardExpanded'

const WithEventDecorator: DecoratorFn = (Story, args) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [tableRef] = useXyoEvent<HTMLDivElement>((noun, verb, data) => console.log(`${noun}|${verb}|${data}`), ref)
  args.args.ref = tableRef

  return <Story {...args} />
}

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessRendererCardExpanded,
  title: 'plugin/boundwitness/CardExpanded/Renderer',
} as Meta

const Template: ComponentStory<typeof BoundWitnessRendererCardExpanded> = (props) => <BoundWitnessRendererCardExpanded {...props} />

const Default = Template.bind({})
Default.args = { payload: sampleBlockWithBoundWitnessPayload }

const WithRef = Template.bind({})
WithRef.decorators = [WithEventDecorator]
WithRef.args = { payload: sampleBlockWithBoundWitnessPayload }

const WithVisibleRows = Template.bind({})
WithVisibleRows.args = { payload: sampleBlockWithBoundWitnessPayload, visibleRows: 3 }

export { Default, WithRef, WithVisibleRows }
