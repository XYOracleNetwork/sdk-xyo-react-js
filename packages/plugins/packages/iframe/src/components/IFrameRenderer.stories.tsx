import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { IFrameRenderer } from './IFrameRenderer.tsx'

const StorybookEntry = {
  argTypes: {},
  component: IFrameRenderer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'plugin/iframe/IFrameRenderer',
} as Meta<typeof IFrameRenderer>

const Template: StoryFn<typeof IFrameRenderer> = args => <IFrameRenderer {...args}></IFrameRenderer>

const Default = Template.bind({})
Default.args = {}

const WithOpenCorsUri = Template.bind({})
WithOpenCorsUri.args = { uri: 'https://cors-anywhere.herokuapp.com/https://www.google.com' }

export { Default, WithOpenCorsUri }

export default StorybookEntry
