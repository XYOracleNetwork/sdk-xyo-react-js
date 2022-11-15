import { ComponentStory, Meta } from '@storybook/react'
import { sampleBlockWithBoundWitnessPayload } from '@xyo-network/react-storybook'

import { BoundWitnessRendererCardExpanded } from './CardExpanded'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessRendererCardExpanded,
  title: 'plugin/boundwitness/CardExpanded/Renderer',
} as Meta

const Template: ComponentStory<typeof BoundWitnessRendererCardExpanded> = (props) => <BoundWitnessRendererCardExpanded {...props} />

const Default = Template.bind({})
Default.args = { payload: sampleBlockWithBoundWitnessPayload }

export { Default }
