import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { PropertyTitle } from './Title.tsx'

const StorybookEntry = {
  argTypes: {},
  component: PropertyTitle,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'property/Title',
} as Meta<typeof PropertyTitle>

const Template: StoryFn<typeof PropertyTitle> = args => <PropertyTitle {...args}></PropertyTitle>

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})

WithData.args = { title: 'Sample Title' }

const WithDataAndActions = Template.bind({})

WithDataAndActions.args = { title: 'Sample Title' }

export { Default, WithData, WithDataAndActions }

export default StorybookEntry
