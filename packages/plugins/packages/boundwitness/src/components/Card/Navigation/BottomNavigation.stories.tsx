import { ComponentStory, Meta } from '@storybook/react'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { sampleBlock } from '@xyo-network/react-storybook'

import { BoundWitnessCardBottomNavigation } from './BottomNavigation'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessCardBottomNavigation,
  title: 'plugin/boundwitness/CardExpanded/BottomNavigation',
} as Meta

const Template: ComponentStory<typeof BoundWitnessCardBottomNavigation> = (props) => {
  return (
    <FlexGrowRow height="calc(100vh - 20px)">
      <BoundWitnessCardBottomNavigation {...props} />
    </FlexGrowRow>
  )
}

const Default = Template.bind({})
Default.args = { boundWitness: sampleBlock }

export { Default }
