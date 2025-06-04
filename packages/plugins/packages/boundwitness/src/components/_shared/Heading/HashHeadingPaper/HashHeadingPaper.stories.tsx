import type { Meta, StoryFn } from '@storybook/react-vite'
import React from 'react'

import { BackPaperAdornment } from './Adornment/index.ts'
import { HashHeadingPaper } from './HashHeadingPaper.tsx'

export default {
  component: HashHeadingPaper,
  title: 'plugin/boundwitness/HashHeadingPaper',
} as Meta

const Template: StoryFn<typeof HashHeadingPaper> = props => <HashHeadingPaper {...props} />

const Default = Template.bind({})
Default.args = {}

const WithHash = Template.bind({})
WithHash.args = { hash: '7982da0e0da76819700079ee21511333d73395805cbeb3e44f25e2d584c8586e' }

const WithSizes = Template.bind({})
WithSizes.args = { hash: '7982da0e0da76819700079ee21511333d73395805cbeb3e44f25e2d584c8586e', size: 'large' }

const WithAdornment = Template.bind({})
WithAdornment.args = {
  AdornmentStart: <BackPaperAdornment sx={{ padding: '24px' }} />,
  hash: '7982da0e0da76819700079ee21511333d73395805cbeb3e44f25e2d584c8586e',
  size: 'medium',
  sx: { columnGap: 0.5 },
}

export {
  Default, WithAdornment, WithHash, WithSizes,
}
