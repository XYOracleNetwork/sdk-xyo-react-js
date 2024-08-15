import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { IFrameRenderer } from './IFrameRenderer.tsx'
import { payloadDataFullScores, payloadDataPartialScores } from './storyPayloadData.tsx'

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

const WithFullScores = Template.bind({})
WithFullScores.args = { payload: payloadDataFullScores }

const WithPartialScores = Template.bind({})
WithPartialScores.args = { payload: payloadDataPartialScores }

export { Default, WithFullScores, WithPartialScores }

export default StorybookEntry
