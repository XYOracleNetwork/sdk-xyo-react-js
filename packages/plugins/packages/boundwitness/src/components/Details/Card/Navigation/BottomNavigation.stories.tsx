import type { Meta, StoryFn } from '@storybook/react-vite'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { sampleBlock } from '@xyo-network/react-storybook'
import React from 'react'

import { BoundWitnessBottomNavigation } from './BottomNavigation.tsx'

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
