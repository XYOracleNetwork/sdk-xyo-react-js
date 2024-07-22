import { Meta, StoryFn } from '@storybook/react'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { sampleBlock } from '@xyo-network/react-storybook'

import { BoundWitnessBottomNavigation } from './BottomNavigation.js'

// eslint-disable-next-line import/no-default-export
export default {
  component: BoundWitnessBottomNavigation,
  title: 'plugin/boundwitness/BottomNavigation',
} as Meta

const Template: StoryFn<typeof BoundWitnessBottomNavigation> = (props) => {
  return (
    <FlexGrowRow height="calc(100vh - 20px)">
      <BoundWitnessBottomNavigation {...props} />
    </FlexGrowRow>
  )
}

const Default = Template.bind({})
Default.args = { boundWitness: sampleBlock }

export { Default }
