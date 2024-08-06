import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { StyleGuideExample } from './StyleGuide.example.js'

const StorybookEntry = {
  argTypes: {},
  component: StyleGuideExample,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/StyleGuide',
} as Meta<typeof StyleGuideExample>

const Template: StoryFn<typeof StyleGuideExample> = () => <StyleGuideExample />

const Default = Template.bind({})
Default.args = {}
Default.decorators = []

export { Default }

export default StorybookEntry
